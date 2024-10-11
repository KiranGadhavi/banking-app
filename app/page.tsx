"use client";
import React from "react";
import Link from "next/link";
import Button from "./components/Button";
import { useAccount } from "../contexts/AccountContext"; // Ensure this is correctly imported
import TransactionCard from "./components/TransactionCard";

export default function Home() {
  const { state } = useAccount(); // Get state from context

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
          {state.transactions.map((transaction) => {
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
          })}
        </article>
      </main>
    </section>
  );
}
