import { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  TrendingUp, 
  X,
  Star
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionText?: string;
  onAction?: () => void;
}

interface NotificationSystemProps {
  notifications?: Notification[];
}

const NotificationSystem = ({ notifications = [] }: NotificationSystemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [newNotifications, setNewNotifications] = useState(0);

  useEffect(() => {
    // Sample notifications for demo
    const defaultNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Payment Received!',
        message: 'Your payment of $456 has been processed successfully. Keep up the great work!',
        timestamp: new Date(Date.now() - 300000),
        read: false,
        actionText: 'View Receipt',
        onAction: () => console.log('View receipt')
      },
      {
        id: '2',
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: 'Congratulations! You\'ve earned the "Payment Streak Master" badge for 5 consecutive on-time payments.',
        timestamp: new Date(Date.now() - 600000),
        read: false,
        actionText: 'View Achievements',
        onAction: () => console.log('View achievements')
      },
      {
        id: '3',
        type: 'info',
        title: 'New Donor Message',
        message: 'Sarah M. left a positive review on your loan application. Your credibility score increased by 15 points!',
        timestamp: new Date(Date.now() - 900000),
        read: false,
        actionText: 'Read Message',
        onAction: () => console.log('Read message')
      },
      {
        id: '4',
        type: 'warning',
        title: 'Payment Reminder',
        message: 'Your next payment of $456 is due in 3 days. Pay early to earn bonus credibility points!',
        timestamp: new Date(Date.now() - 1200000),
        read: true,
        actionText: 'Pay Now',
        onAction: () => console.log('Pay now')
      }
    ];
    
    const allNotifications = notifications.length > 0 ? notifications : defaultNotifications;
    setNotificationList(allNotifications);
    setNewNotifications(allNotifications.filter(n => !n.read).length);
  }, [notifications]);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications
      if (Math.random() > 0.9) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? 'info' : 'success',
          title: Math.random() > 0.5 ? 'Community Update' : 'Score Boost',
          message: Math.random() > 0.5 
            ? 'A new donor is interested in your application!' 
            : 'Your credibility score increased by 5 points!',
          timestamp: new Date(),
          read: false
        };
        
        setNotificationList(prev => [newNotification, ...prev]);
        setNewNotifications(prev => prev + 1);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setNewNotifications(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
    setNewNotifications(0);
  };

  const deleteNotification = (id: string) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
    const notification = notificationList.find(n => n.id === id);
    if (notification && !notification.read) {
      setNewNotifications(prev => Math.max(0, prev - 1));
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'info': return <Info className="w-5 h-5 text-blue-400" />;
      case 'achievement': return <Star className="w-5 h-5 text-violet-400" />;
      default: return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-emerald-500/30';
      case 'warning': return 'border-yellow-500/30';
      case 'info': return 'border-blue-500/30';
      case 'achievement': return 'border-violet-500/30';
      default: return 'border-slate-500/30';
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-500/10';
      case 'warning': return 'bg-yellow-500/10';
      case 'info': return 'bg-blue-500/10';
      case 'achievement': return 'bg-violet-500/10';
      default: return 'bg-slate-500/10';
    }
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
      >
        <Bell className="w-6 h-6" />
        {newNotifications > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse font-inter">
            {newNotifications > 9 ? '9+' : newNotifications}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-linear-to-br from-slate-800 to-slate-900 rounded-xl border border-white/10 shadow-2xl z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white font-clash">Notifications</h3>
            <div className="flex items-center gap-2">
              {newNotifications > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-violet-400 hover:text-violet-300 font-inter"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notificationList.length === 0 ? (
              <div className="p-6 text-center">
                <Bell className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400 font-inter">No notifications yet</p>
              </div>
            ) : (
              notificationList.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-white/5 last:border-b-0 transition-all hover:bg-white/5 ${
                    !notification.read ? 'bg-white/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getBackgroundColor(notification.type)} border ${getBorderColor(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`font-semibold font-clash text-sm ${
                          !notification.read ? 'text-white' : 'text-slate-300'
                        }`}>
                          {notification.title}
                        </h4>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-slate-500 hover:text-slate-300 p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-slate-400 mb-2 font-inter">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-inter">
                          {notification.timestamp.toLocaleString()}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-violet-400 hover:text-violet-300 font-inter"
                            >
                              Mark read
                            </button>
                          )}
                          
                          {notification.actionText && notification.onAction && (
                            <button
                              onClick={() => {
                                notification.onAction?.();
                                markAsRead(notification.id);
                              }}
                              className="text-xs bg-violet-600 hover:bg-violet-700 text-white px-2 py-1 rounded transition-colors font-inter"
                            >
                              {notification.actionText}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notificationList.length > 0 && (
            <div className="p-3 border-t border-white/10 text-center">
              <button className="text-xs text-violet-400 hover:text-violet-300 font-inter flex items-center justify-center gap-1 mx-auto">
                <TrendingUp className="w-3 h-3" />
                View All Activity
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
