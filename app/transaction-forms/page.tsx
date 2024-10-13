"use client"; // Next.js directive to indicate that this is a client-side component

import React, { useState } from "react"; // React imports
import { v4 as uuidv4 } from "uuid"; // Library to generate unique IDs
import { useRouter } from "next/navigation"; // Next.js router for navigation
import Button from "../components/Button"; // Custom button component
import { useAccount } from "../../contexts/AccountContext"; // Import custom AccountContext for state management
import { motion } from "framer-motion"; // Animation library for smooth UI transitions
import TransactionTypeInput from "./components/TransactionTypeInput";
import AmountInput from "./components/AmountInput";
import CurrencyInput from "./components/CurrencyInput";
import DescriptionInput from "./components/DescriptionInput";
import DateInput from "./components/DateInput"; // Custom DateInput component
import FromAccountInput from "./components/FromAccountInput";
import ToAccountInput from "./components/ToAccountInput";

// Define the shape of the form data
interface FormData {
  type: "deposit" | "withdrawal" | "transfer"; // Restrict type to known values
  amount: number;
  description: string;
  fromAccount: string;
  toAccount: string;
  currency: string;
  date: Date | null; // Set the date type to Date or null
}

// Component definition
export default function Page() {
  const router = useRouter(); // Use Next.js router to navigate between pages
  const { dispatch } = useAccount(); // Extract dispatch method from AccountContext to trigger actions

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    type: "deposit",
    amount: 0,
    description: "",
    fromAccount: "",
    toAccount: "",
    currency: "USD",
    date: new Date(), // Initialize with null
  });

  // State to handle status messages
  const [status, setStatus] = useState<{ message: string; isError: boolean }>({
    message: "",
    isError: false,
  });

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Clear previous status message
    setStatus({ message: "", isError: false });

    // Validate form data; if invalid, stop execution
    if (!validateForm()) return;
    try {
      const transactionType = formData.type.toUpperCase() as
        | "DEPOSIT"
        | "WITHDRAW"
        | "TRANSFER"; // Convert transaction type to uppercase

      const transactionId = uuidv4(); // Generate a unique transaction ID

      // Dispatch an action to update the account with the new transaction
      dispatch({
        type: transactionType,
        amount: formData.amount,
        description: formData.description,
        fromAccount: transactionType !== "DEPOSIT" ? formData.fromAccount : "", // Set fromAccount for withdrawals and transfers only
        toAccount: transactionType === "TRANSFER" ? formData.toAccount : "", // Set toAccount only for transfers
        id: transactionId,
        date: formData.date || new Date(),
        // Set the date to the current timestamp
        // Ensure date is formatted correctly
      });

      // Set success status message
      setStatus({ message: "Transaction successful!", isError: false });

      // Reset the form to its initial state
      resetForm();

      // Redirect user to home page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Error while dispatching transaction:", error);
      // Set error status message in case of failure
      setStatus({
        message: "Transaction failed. Please try again.",
        isError: true,
      });
    }
  };

  // Function to validate form data
  const validateForm = () => {
    setStatus({ message: "", isError: false }); // Clear any previous messages

    // Check if the amount is greater than 0
    if (formData.amount <= 0) {
      setStatus({ message: "Amount must be greater than 0", isError: true });
      return false;
    }

    // Check if a date is provided
    if (!formData.date) {
      setStatus({ message: "Date is required", isError: true });
      return false;
    }

    // Check if "toAccount" is provided for transfers
    if (formData.type === "transfer" && !formData.toAccount) {
      setStatus({
        message: "To Account is required for transfers",
        isError: true,
      });
      return false;
    }

    // Check if "fromAccount" is provided for withdrawals and transfers
    if (
      (formData.type === "withdrawal" || formData.type === "transfer") &&
      !formData.fromAccount
    ) {
      setStatus({
        message: "From Account is required for withdrawals and transfers",
        isError: true,
      });
      return false;
    }

    return true; // If all checks pass, return true
  };

  // Function to reset form data to its default values
  const resetForm = () => {
    setFormData({
      type: "deposit",
      amount: 0,
      description: "",
      fromAccount: "",
      toAccount: "",
      currency: "USD",
      date: new Date(), // Reset date to null
    });
  };

  // JSX for rendering the form and status messages
  return (
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
        <h1 className="pt-8">Transaction Form</h1>
        {status.isError && <p className="text-red-500">{status.message}</p>}
        {!status.isError && status.message && (
          <p className="text-green-500">{status.message}</p>
        )}
        <motion.form
          initial={{ opacity: 0, y: 30 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Final animation state
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.4,
          }}
          onSubmit={handleSubmit} // Trigger handleSubmit on form submission
        >
          {/* Render subcomponents */}
          <TransactionTypeInput
            type={formData.type}
            onChange={(value: "deposit" | "withdrawal" | "transfer") => {
              setFormData((prev) => ({ ...prev, type: value }));
            }}
          />
          <AmountInput
            amount={formData.amount}
            onChange={(value: number) =>
              setFormData((prev) => ({ ...prev, amount: value }))
            }
          />
          <CurrencyInput
            currency={formData.currency}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, currency: value }))
            }
          />
          <DescriptionInput
            description={formData.description}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
          />

          {/* Custom DateInput component */}
          <DateInput
            date={formData.date}
            onChange={(date: Date | null) =>
              setFormData((prev) => ({ ...prev, date }))
            }
          />

          {(formData.type === "withdrawal" || formData.type === "transfer") && (
            <FromAccountInput
              fromAccount={formData.fromAccount}
              onChange={(value: string) =>
                setFormData((prev) => ({ ...prev, fromAccount: value }))
              }
            />
          )}
          {formData.type === "transfer" && (
            <ToAccountInput
              toAccount={formData.toAccount}
              onChange={(value: string) =>
                setFormData((prev) => ({ ...prev, toAccount: value }))
              }
            />
          )}

          <Button text="submit" className="mt-4" />
        </motion.form>
      </motion.article>
    </motion.section>
  );
}
