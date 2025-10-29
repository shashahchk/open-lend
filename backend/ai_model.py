# backend/ai_model.py
import random

def evaluate_creditworthiness(income, credit_score):
    """
    Dummy AI model: simple weighted score
    """
    score = 0.6 * (credit_score / 850) + 0.4 * (income / 50000)
    # Convert to probability
    return min(max(score, 0), 1)

def approve_loan(income, credit_score, threshold=0.5):
    probability = evaluate_creditworthiness(income, credit_score)
    return probability >= threshold
