"use client";

export default function AlertCard({ alert }) {
  const severityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  return (
    <div
      className={`p-4 rounded-lg text-white ${
        severityColors[alert.severity] || "bg-gray-500"
      }`}
    >
      <p className="font-semibold">{alert.message}</p>
    </div>
  );
}
