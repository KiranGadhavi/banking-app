"use client";
import React from "react";
import Button from "../components/Button";
import { motion } from "framer-motion";

const AccountOverview: React.FC = () => {
  // const selectedAccount = state.selectedAccount; // Assume you have a way to get the selected account

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <motion.section
        initial={{ opacity: 0, y: 100 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Final animation state
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
        className="grid grid-col gap-4 xs:mx-6 sm:mx-40 md:mx-60 xl:mx-96"
      >
        <motion.article
          initial={{ opacity: 0, scale: 0.9 }} // Initial animation state
          animate={{ opacity: 1, scale: 1 }} // Final animation state
          transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="mx-auto pt-14 text-center">
            <h1 className="text-2xl font-bold pb-4">Account Overview</h1>

            <h2 className="text-xl font-semibold ">Make a Transaction</h2>

            <div className="flex flex gap-4 items-center justify-center">
              <Button text="Deposit" className="bg-blue-500" />

              <Button text="Withdraw" className="bg-green-500 " />

              <Button text="Transfer" className="bg-yellow-500" />
            </div>
          </div>
        </motion.article>
      </motion.section>
      {/* Additional Statistics or Features */}
      {/* You can add charts or other statistics here */}
    </div>
  );
};

export default AccountOverview;
