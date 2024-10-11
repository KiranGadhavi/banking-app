// export default TransactionCard;
import React from "react";
import { format } from "date-fns";
import { FaArrowUp, FaArrowDown, FaExchangeAlt } from "react-icons/fa"; // Import icons

interface TransactionCardProps {
  id: string;
  date?: Date; // Keeping date as a string for compatibility
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  balance: number;
  currency: string;
  description?: string;
  fromAccount?: string | null;
  toAccount?: string | null;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  id,
  date,
  type,
  amount,
  balance,
  currency,
  description,
  fromAccount,
  toAccount,
}) => {
  // Format date for display
  const formattedDate = date
    ? format(new Date(date), "MMM dd, yyyy")
    : "Date not available"; // Handle undefined date

  // Formatting the amount
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(type === "withdrawal" ? -amount : amount);

  // Transaction type color
  const typeColor =
    type === "deposit"
      ? "text-green-500"
      : type === "withdrawal"
      ? "text-red-500"
      : "text-blue-500";

  // Render icon based on transaction type
  const renderIcon = () => {
    switch (type) {
      case "deposit":
        return <FaArrowUp className={`inline-block ${typeColor}`} />;
      case "withdrawal":
        return <FaArrowDown className={`inline-block ${typeColor}`} />;
      case "transfer":
        return <FaExchangeAlt className={`inline-block ${typeColor}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105 border-l-4 border-l-gray-200 w-full sm:w-96 lg:w-112">
      <div className="text-sm text-gray-500 mb-2">Transaction ID: {id}</div>
      <div className="text-sm text-gray-500 mb-4">{formattedDate}</div>
      <div className="flex items-center mb-2">
        <div className="flex items-center mr-auto">
          {renderIcon()}
          <span className={`font-bold text-xl ml-2 ${typeColor}`}>
            {type === "deposit"
              ? "Deposit"
              : type === "withdrawal"
              ? "Withdrawal"
              : "Transfer"}
          </span>
        </div>
        <span className={`text-2xl font-semibold ${typeColor}`}>
          {formattedAmount}
        </span>
      </div>
      {description && (
        <p className="text-md text-gray-700 mb-2">{description}</p>
      )}
      <div className="text-md font-semibold text-gray-800 mb-2">
        Balance:{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
        }).format(balance)}
      </div>
      {type === "transfer" && (
        <div className="mt-2 text-sm text-gray-600">
          {fromAccount && <p>From: {fromAccount}</p>}
          {toAccount && <p>To: {toAccount}</p>}
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
