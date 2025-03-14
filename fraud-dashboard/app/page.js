"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AlertCard from "../components/AlertCard";

export default function Home() {
  const [alerts, setAlerts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Simulate receiving alerts
  useEffect(() => {
    setTimeout(() => {
      setAlerts([
        { id: 1, message: "High-risk transaction detected", severity: "high" },
        { id: 2, message: "Suspicious login attempt", severity: "medium" },
      ]);
    }, 2000);
  }, []);

  // Fetch transactions from the FastAPI backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Fraud Detection Dashboard
        </h1>

        {/* Render any alerts in AlertCard components */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        {/* Display transactions in a table */}
        <div className="mt-6 bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Fraud Score</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className={tx.fraud_score > 0.5 ? "bg-red-100" : "bg-white"}
                >
                  <td className="py-2 px-4 border text-center">{tx.id}</td>
                  <td className="py-2 px-4 border">{tx.description}</td>
                  <td
                    className={`py-2 px-4 border text-center ${
                      tx.fraud_score > 0.5
                        ? "text-red-600 font-bold"
                        : "text-green-600"
                    }`}
                  >
                    {tx.fraud_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
