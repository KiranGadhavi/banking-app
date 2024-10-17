"use client";

import React from "react";
import { useAccount } from "../contexts/AccountContext";
import TransactionCard from "./components/TransactionCard";
import { motion, Variants } from "framer-motion";
import Button from "./components/Button";
import Link from "next/link";

export default function Home() {
  const { state } = useAccount();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
          <main className="max-w-4xl mx-auto">
            <article className="flex flex-col gap-4 py-6">
              {state.transactions.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.2 },
                    },
                  }}
                >
                  {state.transactions.map((transaction) => (
                    <motion.div key={transaction.id} variants={cardVariants}>
                      <TransactionCard
                        id={transaction.id}
                        date={new Date(transaction.date)}
                        type={transaction.type}
                        amount={transaction.amount}
                        balance={transaction.balance}
                        currency={transaction.currency}
                        description={transaction.description}
                        fromAccount={transaction.fromAccount}
                        toAccount={transaction.toAccount}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col py-8 mx-auto text-center">
                  <p className="text-lg ">No transactions available.</p>
                  <p className="m-2 text-lg ">
                    Ready to make your first transaction?
                  </p>
                  <Link href="/transaction-forms">
                    <Button text="Make a Transaction" />
                  </Link>
                </div>
              )}
              {/* {state.transactions.map((transaction) => (
            <TransactionCard key={transaction.id} {...transaction} />
          ))} */}
            </article>
          </main>
        </motion.article>
      </motion.section>
    </div>
  );
}
