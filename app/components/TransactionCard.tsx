import React from "react";
import { format } from "date-fns";

interface TransactionCardProps {
  id: string;
  date: Date;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  balance: number;
  currency: string;
  description?: string;
  fromAccount?: string | null;
  toAccount?: string | null;
  customStyle?: React.CSSProperties;
}

export default function TransactionCard({
  id,
  date,
  type,
  amount,
  balance,
  currency,
  description,
  fromAccount,
  toAccount,
  customStyle,
}: TransactionCardProps) {
  const formattedDate = format(date, "MMM dd, yyyy");
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(type === "withdrawal" ? -amount : amount);

  const typeColor =
    type === "deposit"
      ? "text-green-500"
      : type === "withdrawal"
      ? "text-red-500"
      : "text-blue-500";

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out hover:shadow-lg"
      style={customStyle}
      role="article"
      aria-label={`Transaction: ${type} of ${formattedAmount}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">
          <p>Transaction ID: {id}</p>
        </h2>

        <div className="flex items-center">
          <span className={`mr-2 ${typeColor}`}>
            {type === "deposit"
              ? "↑ Deposit"
              : type === "withdrawal"
              ? "↓ Withdrawal"
              : "↔ Transfer"}
          </span>
          <span className={`font-semibold ${typeColor}`}>
            {formattedAmount}
          </span>
        </div>
      </div>
      <span className="text-sm text-gray-500">{formattedDate}</span>
      {description && (
        <p className={`text-lg font-medium mt-2 ${typeColor}`}>{description}</p>
      )}

      <div className="mt-2 text-sm text-gray-600">
        Balance:{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
        }).format(balance)}
      </div>

      {type === "transfer" && (
        <div className="mt-2 text-sm text-gray-600">
          <p>From: {fromAccount}</p>
          <p>To: {toAccount}</p>
        </div>
      )}
      {type === "withdrawal" && (
        <div>
          <p>Withdrawal from: {fromAccount}</p>
          <p>Amount: {amount}</p>
        </div>
      )}
    </div>
  );
}
