from locust import HttpUser, task, between

class FraudDetectionUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def detect_fraud(self):
        payload = {"description": "Load testing transaction description"}
        self.client.post("/detect_fraud", json=payload)
