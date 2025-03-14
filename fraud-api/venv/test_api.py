# test_api.py
import pytest
from fastapi.testclient import TestClient
from main import app  # Assuming main.py contains your FastAPI app

client = TestClient(app)

def test_list_transactions():
    """
    Test the GET /transactions endpoint.
    """
    response = client.get("/transactions")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "description" in data[0]

def test_detect_fraud():
    """
    Test the POST /detect_fraud endpoint.
    """
    payload = {"description": "Starbucks transaction of $4500 via Chrome"}
    response = client.post("/detect_fraud", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "fraud_score" in data
    assert data["fraud_score"] > 0.0
