// "use client";

// import { useAccount } from "@/contexts/AccountContext";
// import React, { useMemo, useState } from "react";

// const TransactionHistory: React.FC = () => {
//   const { state } = useAccount();
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of transactions per page

//   // Total number of pages
//   const totalPages = Math.ceil(state.transactions.length / itemsPerPage);

//   // Sorting the transactions based on the selected order
//   const sortedTransactions = useMemo(() => {
//     return [...state.transactions].sort((a, b) => {
//       const dateA = new Date(a.date).getTime();
//       const dateB = new Date(b.date).getTime();
//       return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//     });
//   }, [state.transactions, sortOrder]);

//   // Paginate transactions
//   const paginatedTransactions = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
//   }, [sortedTransactions, currentPage]);

//   // Toggle sort order between ascending and descending
//   const toggleSortOrder = () => {
//     setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//   };

//   // Handle previous page
//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   // Handle next page
//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   return (
//     <div className="flex flex-col gap-8 items-center justify-center xs:p-10 font-sans">
//       <h1 className="text-3xl font-bold">Transaction History</h1>

//       <button
//         onClick={toggleSortOrder}
//         className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
//       >
//         Sort by Date: {sortOrder === "asc" ? "Ascending" : "Descending"}
//       </button>

//       {/* Desktop Table View */}
//       <div className=" w-full overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 table-auto">
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
//             {paginatedTransactions.map((transaction) => (
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
//       {/* Pagination */}
//       <div className="flex justify-between w-full mt-4">
//         <button
//           className={`${
//             currentPage === 1 ? "bg-gray-300" : "bg-blue-500"
//           } text-white py-2 px-4 rounded`}
//           onClick={() => setCurrentPage(1)}
//           disabled={currentPage === 1}
//         >
//           First
//         </button>
//         <button
//           className={`${
//             currentPage === 1 ? "bg-gray-300" : "bg-blue-500"
//           } text-white py-2 px-4 rounded`}
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="text-gray-700">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className={`${
//             currentPage === totalPages ? "bg-gray-300" : "bg-blue-500"
//           } text-white py-2 px-4 rounded`}
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//         <button
//           className={`${
//             currentPage === totalPages ? "bg-gray-300" : "bg-blue-500"
//           } text-white py-2 px-4 rounded`}
//           onClick={() => setCurrentPage(totalPages)}
//           disabled={currentPage === totalPages}
//         >
//           Last
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;
"use client";
// "use client";

import { useAccount } from "@/contexts/AccountContext";
import React, { useMemo, useState } from "react";

const TransactionHistory: React.FC = () => {
  const { state } = useAccount();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default: most recent first (descending)
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDeposits, setFilterDeposits] = useState(false);
  const [filterWithdrawals, setFilterWithdrawals] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const itemsPerPage = 10; // Number of transactions per page

  // Total number of pages
  const totalPages = Math.ceil(state.transactions.length / itemsPerPage);

  // Filtering the transactions based on deposits, withdrawals, and date range
  const filteredTransactions = useMemo(() => {
    return state.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      // Check deposits and withdrawals filter (AND operator)
      const isDepositMatch = filterDeposits
        ? transaction.type === "deposit"
        : true;
      const isWithdrawalMatch = filterWithdrawals
        ? transaction.type === "withdrawal"
        : true;

      // Check date range filter
      const isStartDateMatch = startDate
        ? transactionDate >= new Date(startDate)
        : true;
      const isEndDateMatch = endDate
        ? transactionDate <= new Date(endDate)
        : true;

      // Apply all filters with AND logic
      return (
        isDepositMatch &&
        isWithdrawalMatch &&
        isStartDateMatch &&
        isEndDateMatch
      );
    });
  }, [
    state.transactions,
    filterDeposits,
    filterWithdrawals,
    startDate,
    endDate,
  ]);

  // Sorting the transactions based on the selected order
  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [filteredTransactions, sortOrder]);

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
    <div className="flex flex-col gap-8 items-center justify-center xs:p-10 font-sans">
      <h1 className="text-3xl font-bold">Transaction History</h1>

      {/* Filters Section */}
      <div className="flex gap-4">
        <div className="flex gap-4 sm:flex-row xs:flex-col xs:items-center xs:justify-center xs:gap-4">
          <label className="flex items-center gap-2">
            <input
              className="rounded-md p-1 border-2 hover:border-blue-500"
              type="checkbox"
              checked={filterDeposits}
              onChange={() => setFilterDeposits((prev) => !prev)}
            />
            Deposits
          </label>
          <label className="flex items-center gap-2">
            <input
              className="rounded-md p-1 border-2 hover:border-blue-500"
              type="checkbox"
              checked={filterWithdrawals}
              onChange={() => setFilterWithdrawals((prev) => !prev)}
            />
            Withdrawals
          </label>
        </div>
        <div className="flex gap-4 sm:flex-row xs:flex-col xs:items-center xs:justify-center xs:gap-4">
          <label className="flex items-center gap-2">
            Start Date:
            <input
              className="text-black rounded-md p-1 ml-2 border-2 hover:border-blue-500"
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2">
            End Date:
            <input
              className="text-black rounded-md p-1 ml-2 border-2 hover:border-blue-500"
              type="date"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
      </div>

      <button
        onClick={toggleSortOrder}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Sort by Date: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>

      {/* Desktop Table View */}
      <div className="w-full overflow-x-auto">
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

      {/* Pagination */}
      <div className="flex justify-between w-full mt-4">
        <button
          className={`${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500"
          } text-white sm:py-2 sm:px-4 xs:p-1 rounded mr-2`}
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className={`${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500"
          } text-white sm:py-2 sm:px-4 xs:p-1 rounded mr-2`}
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
          } text-white sm:py-2 sm:px-4 xs:p-1 rounded mr-2`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className={`${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500"
          } text-white sm:py-2 sm:px-4 xs:p-1 rounded mr-2`}
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
