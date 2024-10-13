"use client";

import { useAccount } from "@/contexts/AccountContext";
// import { Transaction } from '@/contexts/AccountContext';
import React, { useMemo, useState } from "react";

const TransactionHistory: React.FC = () => {
  const { state } = useAccount();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedTransactions = useMemo(() => {
    return [...state.transactions].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [state.transactions, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <h1 className="text-3xl font-bold">Transaction History</h1>
      <p>Welcome to the transaction history!</p>

      <button
        onClick={toggleSortOrder}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Sort by Date: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    transaction.type === "deposit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    transaction.type === "withdrawal"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(transaction.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.balance !== undefined
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(transaction.balance)
                    : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.description || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
