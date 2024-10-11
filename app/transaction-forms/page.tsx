"use client";

import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { useAccount } from "../../contexts/AccountContext";

export default function Transpage() {
  const router = useRouter();
  const { dispatch } = useAccount();

  const [formData, setFormData] = useState({
    type: "deposit",
    amount: 0,
    description: "",
    fromAccount: "",
    toAccount: "",
    currency: "USD",
  });

  const [status, setStatus] = useState({ message: "", isError: false });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    if (!validateForm()) return; // If validation fails, stop submission

    try {
      const transactionType = formData.type.toUpperCase() as
        | "DEPOSIT"
        | "WITHDRAW"
        | "TRANSFER";

      // Dispatch the transaction
      dispatch({
        type: transactionType,
        amount: formData.amount,
        description: formData.description,
        toAccount: formData.type === "transfer" ? formData.toAccount : "",
        fromAccount:
          formData.type === "withdrawal" || formData.type === "transfer"
            ? formData.fromAccount
            : "",
      });

      // Show success message
      setStatus({ message: "Transaction successful!", isError: false });
      resetForm();

      // Navigate to home page after 10 seconds
      setTimeout(() => {
        router.push("/");
      }, 10000);
    } catch (error) {
      setStatus({
        message: "Transaction failed. Please try again.",
        isError: true,
      });
    }
  };

  const validateForm = () => {
    setStatus({ message: "", isError: false });

    // Validate amount
    if (formData.amount <= 0) {
      setError("Amount must be greater than 0");
      return false;
    }

    // Validate transfer account
    if (formData.type === "transfer" && !formData.toAccount) {
      setError("To Account is required for transfers");
      return false;
    }

    // Validate from account for withdrawals and transfers
    if (
      (formData.type === "withdrawal" || formData.type === "transfer") &&
      !formData.fromAccount
    ) {
      setError("From Account is required for withdrawals and transfers");
      return false;
    }

    return true; // Return true if all validations pass
  };

  const resetForm = () => {
    setFormData({
      type: "deposit",
      amount: 0,
      description: "",
      fromAccount: "",
      toAccount: "",
      currency: "USD",
    });
  };

  const transactionTypes = [
    { value: "deposit", label: "Deposit" },
    { value: "withdrawal", label: "Withdrawal" },
    { value: "transfer", label: "Transfer" },
  ];

  const currencies = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
  ];

  return (
    <section className="grid grid-col gap-4 xs:mx-6 sm:mx-40 md:mx-60 xl:mx-96">
      <article className="flex flex-col gap-4">
        <h1 className="pt-8">Transaction Form</h1>

        {/* Render error message if it exists */}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <FormInput
            id={uuidv4()}
            label="Type"
            value={formData.type}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, type: value }))
            }
            type="select"
            options={transactionTypes}
          />
          <FormInput
            type="number"
            id={uuidv4()}
            label="Amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, amount: parseFloat(value) }))
            }
          />
          <FormInput
            id={uuidv4()}
            label="Currency"
            value={formData.currency}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, currency: value }))
            }
            type="select"
            options={currencies}
          />
          <FormInput
            type="text"
            id={uuidv4()}
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
          />
          {formData.type !== "deposit" && (
            <FormInput
              type="text"
              id={uuidv4()}
              label="From Account"
              placeholder="Enter from account"
              value={formData.fromAccount}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, fromAccount: value }))
              }
            />
          )}
          {formData.type === "transfer" && (
            <FormInput
              type="text"
              id={uuidv4()}
              label="To Account"
              placeholder="Enter to account"
              value={formData.toAccount}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, toAccount: value }))
              }
            />
          )}
          <Button text="Submit" onClick={() => {}} />
        </form>

        {status.message && (
          <p
            className={`mt-4 ${
              status.isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {status.message}
          </p>
        )}
      </article>
    </section>
  );
}
