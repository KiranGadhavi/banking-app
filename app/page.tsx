// import Image from "next/image";
"use client";
import Link from "next/link";
import Button from "./components/Button";
import FormInput from "./components/FormInput";
import { useState } from "react";
import TransactionCard from "./components/TransactionCard";
import { AccountProvider } from "../contexts/AccountContext";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [name, setName] = useState("name");

  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <AccountProvider>
      <div className="grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex flex-col gap-2">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/account-overview">Account Overview</Link>
            <Link href="/transaction-forms">Transaction Forms</Link>
            <Link href="/transaction-history">Transaction History</Link>
          </div>
          <FormInput
            id={uuidv4()}
            type={"text"}
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(name) => setName(name)}
            className="text-black"
          />
          <Button
            text="Click me"
            onClick={() => console.log("Button clicked")}
          />

          <TransactionCard
            date={new Date()}
            type="transfer"
            amount={100}
            balance={1000}
            currency="USD"
            description="Transaction 1"
            fromAccount="Savings Account"
            toAccount="Checking Account"
          />
          <TransactionCard
            date={new Date()}
            type="deposit"
            amount={200}
            balance={5000}
            currency="EUR" // Specify the currency here
            description="Salary Deposit"
          />
          <TransactionCard
            date={new Date()}
            type="withdrawal"
            amount={200}
            balance={5000}
            currency="INR" // Specify the currency here
            description="Salary Deposit"
          />
        </main>
      </div>
    </AccountProvider>
  );
}
