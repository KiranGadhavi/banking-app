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
          {state.transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              date={transaction.date}
              type={transaction.type}
              amount={transaction.amount}
              balance={state.balance} // or calculate accordingly
              currency="USD" // Adjust if you want to use currency dynamically
              description={transaction.description}
              fromAccount={transaction.fromAccount} // Only show if applicable
              toAccount={transaction.toAccount} // Only show if applicable
            />
          ))}
        </article>
      </main>
    </section>
  );
}
