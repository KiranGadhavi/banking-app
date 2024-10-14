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
    <section className="min-h-screen bg-gray-50 p-4 sm:p-8">
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
              <p className="text-lg text-gray-600">
                No transactions available.
              </p>
              <p className="m-2 text-lg text-gray-600">
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
    </section>
  );
}
