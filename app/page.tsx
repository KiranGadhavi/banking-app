"use client";
import React from "react";
import { useAccount } from "../contexts/AccountContext"; // Ensure this is correctly imported
import TransactionCard from "./components/TransactionCard";
import { motion } from "framer-motion"; // Import motion from Framer Motion

export default function Home() {
  const { state } = useAccount(); // Get state from context

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <main className="max-w-4xl mx-auto">
        <article className="flex flex-col gap-4 py-6">
          {/* Your existing navigation buttons */}
          {state.transactions.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            >
              {state.transactions.map((transaction) => (
                <motion.div key={transaction.id} variants={cardVariants}>
                  <TransactionCard
                    id={transaction.id}
                    date={transaction.date} // Ensure this is a string
                    type={transaction.type}
                    amount={transaction.amount}
                    balance={state.balance}
                    currency="USD"
                    description={transaction.description}
                    fromAccount={transaction.fromAccount}
                    toAccount={transaction.toAccount}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col py-8 mx-auto text-center">
              <h2 className="text-3xl font-bold pb-6 text-gray-700">
                Welcome to Your Dashboard
              </h2>
              <p className="text-lg text-gray-600">
                No transactions available.
              </p>
            </div>
          )}
        </article>
      </main>
    </section>
  );
}
