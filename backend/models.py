# backend/models.py
from pydantic import BaseModel

class LoanRequest(BaseModel):
    name: str
    amount: float
    purpose: str
    income: float
    credit_score: float  # input to AI model
