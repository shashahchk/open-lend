# backend/main.py
from fastapi import FastAPI
from models import LoanRequest
from ai_model import approve_loan
import sqlite3

app = FastAPI(title="FundTogether Loan System")

# Initialize DB
conn = sqlite3.connect("loans.db")
conn.execute("""
CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    amount REAL,
    purpose TEXT,
    income REAL,
    credit_score REAL,
    approved INTEGER
)
""")
conn.commit()

@app.post("/loan-request")
def loan_request(request: LoanRequest):
    approved = approve_loan(request.income, request.credit_score)
    conn.execute(
        "INSERT INTO loans (name, amount, purpose, income, credit_score, approved) VALUES (?, ?, ?, ?, ?, ?)",
        (request.name, request.amount, request.purpose, request.income, request.credit_score, int(approved))
    )
    conn.commit()
    return {"approved": approved, "message": "Loan request processed"}
