import { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Settings, 
  Users,
  Clock,
  Signal
} from 'lucide-react';

interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
  participants?: Array<{
    id: string;
    name: string;
    role: 'borrower' | 'donor' | 'support';
    isMuted?: boolean;
    isSpeaking?: boolean;
  }>;
}

const VoiceChat = ({ isOpen, onClose, participants = [] }: VoiceChatProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const callStartTime = useRef<Date | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  
  // Default participants for demo
  const defaultParticipants = [
    {
      id: '1',
      name: 'You',
      role: 'borrower' as const,
      isMuted: isMuted,
      isSpeaking: !isMuted && audioLevel > 20
    },
    {
      id: '2',
      name: 'Sarah Chen (Support)',
      role: 'support' as const,
      isMuted: false,
      isSpeaking: Math.random() > 0.7 // Simulate random speaking
    },
    {
      id: '3',
      name: 'Michael Rodriguez (Donor)',
      role: 'donor' as const,
      isMuted: true,
      isSpeaking: false
    }
  ];

  const allParticipants = participants.length > 0 ? participants : defaultParticipants;

  // Handle call timer
  useEffect(() => {
    let interval: number;
    if (isConnected) {
      interval = setInterval(() => {
        if (callStartTime.current) {
          const elapsed = Math.floor((Date.now() - callStartTime.current.getTime()) / 1000);
          setCallDuration(elapsed);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  // Simulate audio level for demo
  useEffect(() => {
    if (isConnected && !isMuted) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isConnected, isMuted]);

  const startCall = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would initialize WebRTC here
      mediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsConnected(true);
      setIsConnecting(false);
      callStartTime.current = new Date();
    } catch (error) {
      console.error('Failed to start voice chat:', error);
      setIsConnecting(false);
    }
  };

  const endCall = () => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop());
    }
    setIsConnected(false);
    setIsConnecting(false);
    setCallDuration(0);
    callStartTime.current = null;
    onClose();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (mediaStream.current) {
      mediaStream.current.getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
    }
  };

  const toggleDeafen = () => {
    setIsDeafened(!isDeafened);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'support': return 'text-blue-400 bg-blue-500/20';
      case 'donor': return 'text-emerald-400 bg-emerald-500/20';
      case 'borrower': return 'text-violet-400 bg-violet-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white font-clash">Voice Chat</h3>
            <div className="flex items-center gap-2 mt-1">
              {isConnected ? (
                <>
                  <Signal className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-inter">Connected</span>
                  <span className="text-sm text-slate-400 font-inter">• {formatDuration(callDuration)}</span>
                </>
              ) : isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-violet-400 font-inter">Connecting...</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400 font-inter">Ready to connect</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Participants */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400 font-inter">Participants ({allParticipants.length})</span>
          </div>
          
          <div className="space-y-2">
            {allParticipants.map(participant => (
              <div 
                key={participant.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  participant.isSpeaking 
                    ? 'bg-violet-500/20 border-violet-500/50 shadow-lg' 
                    : 'bg-slate-700/30 border-white/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRoleColor(participant.role)}`}>
                  <span className="text-sm font-bold font-clash">
                    {participant.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <p className="text-white font-semibold font-inter text-sm">{participant.name}</p>
                  <p className="text-xs text-slate-400 font-inter capitalize">{participant.role}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {participant.isSpeaking && (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map(i => (
                        <div 
                          key={i}
                          className="w-1 bg-violet-400 rounded-full animate-pulse"
                          style={{ 
                            height: Math.random() * 12 + 4 + 'px',
                            animationDelay: i * 0.1 + 's'
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {participant.isMuted ? (
                    <MicOff className="w-4 h-4 text-red-400" />
                  ) : (
                    <Mic className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Level Indicator */}
        {isConnected && !isMuted && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Mic className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-slate-400 font-inter">Your microphone</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-linear-to-r from-emerald-500 to-violet-500 h-2 rounded-full transition-all duration-100"
                style={{ width: `${audioLevel}%` }}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={toggleMute}
            disabled={!isConnected}
            className={`p-3 rounded-full transition-all ${
              isMuted 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <button
            onClick={toggleDeafen}
            disabled={!isConnected}
            className={`p-3 rounded-full transition-all ${
              isDeafened 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isDeafened ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Call Actions */}
        <div className="flex gap-3">
          {!isConnected && !isConnecting ? (
            <button
              onClick={startCall}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold font-inter transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Join Voice Chat
            </button>
          ) : (
            <button
              onClick={endCall}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold font-inter transition-colors flex items-center justify-center gap-2"
            >
              <PhoneOff className="w-5 h-5" />
              {isConnecting ? 'Cancel' : 'Leave Call'}
            </button>
          )}
          
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg font-semibold font-inter transition-colors"
          >
            Close
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-white/10">
            <h4 className="text-white font-semibold font-clash mb-3">Audio Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-400 mb-1 font-inter">Microphone</label>
                <select className="w-full bg-slate-600 border border-white/10 rounded px-3 py-2 text-white text-sm font-inter">
                  <option>Default - Built-in Microphone</option>
                  <option>External USB Microphone</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1 font-inter">Speakers</label>
                <select className="w-full bg-slate-600 border border-white/10 rounded px-3 py-2 text-white text-sm font-inter">
                  <option>Default - Built-in Output</option>
                  <option>Headphones</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceChat;
