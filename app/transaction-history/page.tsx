// "use client"; // Ensure this is the very first line

// import { useAccount } from "@/contexts/AccountContext"; // Adjust according to your structure
// import React, { useEffect, useState } from "react";
// // Ensure you import or define the Transaction type
// interface Transaction {
//   id: string; // Unique identifier for each transaction
//   date: Date; // Keeping date as string to store in ISO format
//   type: "deposit" | "withdrawal" | "transfer";
//   amount: number;
//   description?: string;
//   fromAccount?: string | null;
//   toAccount?: string | null;
//   balance?: number; // Added balance as an optional property
// }

// const TransactionHistory: React.FC = () => {
//   const { state } = useAccount();
//   const [transactions, setTransactions] = useState<Transaction[]>(
//     state.transactions
//   );
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

//   const sortTransactions = () => {
//     const sorted = [...transactions].sort((a, b) => {
//       const dateA = new Date(a.date).getTime();
//       const dateB = new Date(b.date).getTime();
//       return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//     });
//     setTransactions(sorted);
//   };

//   useEffect(() => {
//     sortTransactions();
//   }, [sortOrder, transactions]);

//   const toggleSortOrder = () => {
//     setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//   };

//   return (
//     <div className="flex flex-col gap-8 items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
//       <h1 className="text-3xl font-bold">Transaction History</h1>
//       <p>Welcome to the transaction history!</p>

//       <button
//         onClick={toggleSortOrder}
//         className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
//       >
//         Sort by Date: {sortOrder === "asc" ? "Ascending" : "Descending"}
//       </button>

//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Transaction ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Type
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Balance
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Description
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {transactions.map((transaction) => (
//               <tr key={transaction.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.id}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {new Date(transaction.date).toLocaleDateString()}
//                 </td>
//                 <td
//                   className={`px-6 py-4 whitespace-nowrap text-sm ${
//                     transaction.type === "deposit"
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {transaction.type.charAt(0).toUpperCase() +
//                     transaction.type.slice(1)}
//                 </td>
//                 <td
//                   className={`px-6 py-4 whitespace-nowrap text-sm ${
//                     transaction.type === "withdrawal"
//                       ? "text-red-600"
//                       : "text-green-600"
//                   }`}
//                 >
//                   {new Intl.NumberFormat("en-US", {
//                     style: "currency",
//                     currency: "USD",
//                   }).format(transaction.amount)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.balance !== undefined // Check if balance is defined
//                     ? new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                       }).format(transaction.balance) // Format balance if defined
//                     : "-"}{" "}
//                   // Display '-' if balance is undefined
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.description || "-"}
//                 </td>

//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.description || "-"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;
"use client"; // Ensure this is the very first line

import { useAccount } from "@/contexts/AccountContext"; // Adjust according to your structure
import React, { useEffect, useState } from "react";

interface Transaction {
  id: string; // Unique identifier for each transaction
  date: Date; // Date as string for easier parsing
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  description?: string;
  fromAccount?: string | null;
  toAccount?: string | null;
  balance?: number; // Added balance as an optional property
}

const TransactionHistory: React.FC = () => {
  const { state } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    console.log("Current Transactions State:", state.transactions); // Log the transactions state
    if (state.transactions) {
      setTransactions(state.transactions);
    }
  }, [state.transactions]);

  const sortTransactions = () => {
    const sorted = [...transactions].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTransactions(sorted);
  };

  useEffect(() => {
    sortTransactions();
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
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
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
