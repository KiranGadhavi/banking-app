import React from "react";
import Button from "../components/Button";

const AccountOverview: React.FC = () => {
  // const selectedAccount = state.selectedAccount; // Assume you have a way to get the selected account

  return (
    <div className="grid item-center justify-center font-sans pt-20 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Account Overview</h1>
      {/* Transaction Forms Section */}
      <div className="  mt-4 gap-4">
        <h2 className="text-xl font-semibold mb-2">Make a Transaction</h2>
        <div className="flex flex gap-4">
          <Button text="Deposit" className="bg-blue-500" />

          <Button text="Withdraw" className="bg-green-500 " />

          <Button text="Transfer" className="bg-yellow-500" />
        </div>
      </div>

      {/* Additional Statistics or Features */}
      {/* You can add charts or other statistics here */}
    </div>
  );
};

export default AccountOverview;
