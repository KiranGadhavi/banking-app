import React from "react";

const AccountOverview: React.FC = () => {
  // const selectedAccount = state.selectedAccount; // Assume you have a way to get the selected account

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">Account Overview</h1>
      {/* Transaction Forms Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Make a Transaction</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Deposit
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded">
          Withdraw
        </button>
        <button className="bg-yellow-500 text-white py-2 px-4 rounded">
          Transfer
        </button>
      </div>

      {/* Additional Statistics or Features */}
      {/* You can add charts or other statistics here */}
    </div>
  );
};

export default AccountOverview;
