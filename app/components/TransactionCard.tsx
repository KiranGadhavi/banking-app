import React from "react";
import { format } from "date-fns";

interface TransactionCardProps {
  date: Date;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  balance: number;
  description?: string;
  fromAccount?: string;
  toAccount?: string;
}

export default function TransactionCard({
  date,
  type,
  amount,
  balance,
  description,
  fromAccount,
  toAccount,
}: TransactionCardProps) {
  const formattedDate = format(date, "MMM dd, yyyy");
  return (
    // <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    //   <div className="flex justify-between items-center">
    //     <span className="text-sm text-gray-500">{formattedDate}</span>
    //     <span
    //       className={`font-semibold ${
    //         type === "deposit" ? "text-green-500" : "text-red-500"
    //       }`}
    //     >
    //       {type === "deposit" ? "+" : "-"}${amount.toFixed(2)}
    //     </span>
    //   </div>
    //   <p className="text-lg font-medium mt-2">{description}</p>
    //   <div className="mt-2 text-sm text-gray-600">
    //     Balance: ${balance.toFixed(2)}
    //   </div>
    //   <div
    //     className={`font-semibold ${
    //       type === "deposit"
    //         ? "text-green-500"
    //         : type === "withdrawal"
    //         ? "text-red-500"
    //         : "text-blue-500"
    //     }`}
    //   >
    //     {type === "transfer" && (
    //       <div className="mt-2 text-sm text-gray-600">
    //         <p>From: {fromAccount}</p>
    //         <p>To: {toAccount}</p>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        {/* <div className="flex items-center">
          <span
            className={`mr-2 ${
              type === "deposit" ? "text-green-500" : "text-red-500"
            }`}
          >
            {type === "deposit"
              ? "↑"
              : type === "withdrawal"
              ? "↓"
              : type === "transfer"
              ? "↔"
              : ""}
          </span>
          <span
            className={`font-semibold ${
              type === "deposit"
                ? "text-green-500"
                : type === "withdrawal"
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {type === "deposit" ? "+" : "-"}${amount.toFixed(2)}
          </span>
        </div> */}
        <div className="flex items-center">
          <span
            className={`mr-2 ${
              type === "deposit"
                ? "text-green-500"
                : type === "withdrawal"
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {type === "deposit"
              ? "↑ Deposit"
              : type === "withdrawal"
              ? "↓ Withdrawal"
              : "↔ Transfer"}
          </span>
          <span
            className={`font-semibold ${
              type === "deposit"
                ? "text-green-500"
                : type === "withdrawal"
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {type === "deposit" ? "+" : "-"}${amount.toFixed(2)}
          </span>
        </div>
      </div>
      <p
        className={`text-lg font-medium mt-2 ${
          type === "deposit" ? "text-green-500" : "text-red-500"
        }`}
      >
        {description}
      </p>
      <div className="mt-2 text-sm text-gray-600">
        Balance: ${balance.toFixed(2)}
      </div>
      {type === "transfer" && (
        <div className="mt-2 text-sm text-gray-600">
          <p>From: {fromAccount}</p>
          <p>To: {toAccount}</p>
        </div>
      )}
    </div>
  );
}
