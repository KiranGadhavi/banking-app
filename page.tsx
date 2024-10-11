"use client";
import React, { useEffect } from "react";
import Link from "next/link";
// import Button from "./components/Button";
// import { useAccount } from "../contexts/AccountContext";
// Ensure this is correctly imported
import Button from "./app/components/Button";
import TransactionCard from "./app/components/TransactionCard";
import { useAccount } from "./contexts/AccountContext";

export default function Home() {
  // Get state from context
  const { state } = useAccount();
  useEffect(() => {
    console.log("Component mounted. Initial transactions:", state.transactions);
  }, []);

  useEffect(() => {
    console.log("Transactions updated:", state.transactions);
  }, [state.transactions]);
  return (
    <section className="grid grid-rows sm:mx-14 gap-4 xs:mx-4">
      <main>
        {/* Your existing navigation buttons */}
        <article className="flex flex-row gap-2 py-6 ">
          <Link href="/dashboard">
            <Button text="Dashboard" />
          </Link>
          <Link href="/account-overview">
            <Button text="Account Overview" />
          </Link>
          <Link href="/transaction-forms">
            <Button text="Transaction Forms" />
          </Link>
          <Link href="/transaction-history">
            <Button text="Transaction History" />
          </Link>
        </article>
        <article>
          {/* {state.transactions.map((transaction) => {
            console.log("Rendering transaction:", transaction); // Log each transaction for debugging
            return (
              <TransactionCard
                key={transaction.id}
                id={transaction.id}
                date={transaction.date}
                type={transaction.type} // Should be 'deposit', 'withdrawal', or 'transfer'
                amount={transaction.amount}
                balance={state.balance} // Ensure this is updated accordingly
                currency="USD" // Or dynamically based on the transaction
                description={transaction.description}
                fromAccount={transaction.fromAccount}
                toAccount={transaction.toAccount}
              />
            );
          })} */}
          {state.transactions.length > 0 ? (
            state.transactions.map((transaction) => {
              console.log("Rendering transaction:", transaction);
              return (
                <TransactionCard
                  key={transaction.id}
                  id={transaction.id}
                  date={transaction.date}
                  type={transaction.type}
                  amount={transaction.amount}
                  balance={state.balance}
                  currency="USD"
                  description={transaction.description}
                  fromAccount={transaction.fromAccount}
                  toAccount={transaction.toAccount}
                />
              );
            })
          ) : (
            <p>No transactions available.</p>
          )}
        </article>
      </main>
    </section>
  );
}
