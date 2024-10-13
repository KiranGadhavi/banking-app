// "use client";

// import { useAccount } from "@/contexts/AccountContext";
// // import { Transaction } from '@/contexts/AccountContext';
// import React, { useMemo, useState } from "react";

// const TransactionHistory: React.FC = () => {
//   const { state } = useAccount();
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

//   const sortedTransactions = useMemo(() => {
//     return [...state.transactions].sort((a, b) => {
//       const dateA = new Date(a.date).getTime();
//       const dateB = new Date(b.date).getTime();
//       return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//     });
//   }, [state.transactions, sortOrder]);

//   const toggleSortOrder = () => {
//     setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//   };

//   return (
//     <div className="flex flex-col gap-8 items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-sans">
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
//             {sortedTransactions.map((transaction) => (
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
//                   {transaction.balance !== undefined
//                     ? new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                       }).format(transaction.balance)
//                     : "-"}
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
"use client";

import { useAccount } from "@/contexts/AccountContext";
import React, { useMemo, useState } from "react";

const TransactionHistory: React.FC = () => {
  const { state } = useAccount();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of transactions per page

  // Total number of pages
  const totalPages = Math.ceil(state.transactions.length / itemsPerPage);

  // Sorting the transactions based on the selected order
  const sortedTransactions = useMemo(() => {
    return [...state.transactions].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [state.transactions, sortOrder]);

  // Paginate transactions
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTransactions, currentPage]);

  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen sm:p-10 font-sans">
      <h1 className="text-3xl font-bold">Transaction History</h1>

      <button
        onClick={toggleSortOrder}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Sort by Date: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>

      {/* Desktop Table View */}
      <div className="hidden sm:block w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
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
            {paginatedTransactions.map((transaction) => (
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

      {/* Mobile Cards View */}
      <div className="sm:hidden w-full space-y-4">
        {paginatedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white shadow-md rounded-lg p-4 overflow-x-auto"
          >
            <div className="flex justify-between min-w-[400px]">
              <div>
                <span className="font-bold">Transaction ID:</span>
                <p>{transaction.id}</p>
              </div>
              <div>
                <span className="font-bold">Date:</span>
                <p>{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex justify-between min-w-[400px] mt-2">
              <div>
                <span className="font-bold">Type:</span>
                <p
                  className={
                    transaction.type === "deposit"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </p>
              </div>
              <div>
                <span className="font-bold">Amount:</span>
                <p
                  className={
                    transaction.type === "withdrawal"
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(transaction.amount)}
                </p>
              </div>
            </div>

            <div className="flex justify-between min-w-[400px] mt-2">
              <div>
                <span className="font-bold">Balance:</span>
                <p>
                  {transaction.balance !== undefined
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(transaction.balance)
                    : "-"}
                </p>
              </div>
              <div>
                <span className="font-bold">Description:</span>
                <p>{transaction.description || "-"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between w-full mt-4">
        <button
          className={`${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500"
          } text-white py-2 px-4 rounded`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500"
          } text-white py-2 px-4 rounded`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
