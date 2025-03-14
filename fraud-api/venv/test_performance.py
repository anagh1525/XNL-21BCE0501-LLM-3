# test_performance.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_detect_fraud_performance(benchmark):
    def run_detect_fraud():
        payload = {"description": "Load test transaction"}
        client.post("/detect_fraud", json=payload)

    benchmark(run_detect_fraud)
