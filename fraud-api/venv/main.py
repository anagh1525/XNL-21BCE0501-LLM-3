# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

def compute_fraud_score(description: str) -> float:
    if "4500" in description:
        return 0.8
    return 0.3

class Transaction(BaseModel):
    description: str

app = FastAPI(
    title="Fraud Detection API",
    description="API for real-time fraud detection in transactions.",
    version="1.0.0"
)

@app.post("/detect_fraud", summary="Detect Fraud in a Transaction")
async def detect_fraud(transaction: Transaction):
    try:
        fraud_score = compute_fraud_score(transaction.description)
        return {"description": transaction.description, "fraud_score": fraud_score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/transactions", summary="List Transactions (Demo)")
async def list_transactions():
    demo_transactions = [
        {
            "id": 1,
            "description": "Starbucks transaction of $4500 on 2025-03-14 via Chrome",
            "fraud_score": 0.8,
        },
        {
            "id": 2,
            "description": "Amazon transaction of $50 on 2025-03-14 via Safari",
            "fraud_score": 0.3,
        },
    ]
    return demo_transactions

# Enable CORS so Next.js (port 3000) can request data
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
