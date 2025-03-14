"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FraudTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulated transaction fetch (Replace with actual API)
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => {
        setTransactions(
          res.data.map((item) => ({
            id: item.id,
            amount: Math.floor(Math.random() * 10000),
            status: Math.random() > 0.5 ? "Fraudulent" : "Normal",
          }))
        );
      });
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Recent Transactions</h2>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Amount ($)</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b">
                <td className="py-2 px-4">{tx.id}</td>
                <td className="py-2 px-4">{tx.amount}</td>
                <td
                  className={`py-2 px-4 ${
                    tx.status === "Fraudulent"
                      ? "text-red-600 font-bold"
                      : "text-green-600"
                  }`}
                >
                  {tx.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
