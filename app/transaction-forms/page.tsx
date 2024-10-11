"use client";

import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { useAccount } from "../../contexts/AccountContext";
import { motion } from "framer-motion";
import {
  FiType,
  FiClipboard,
  FiUser,
  FiGlobe,
  FiHash,
  FiCalendar, // Importing calendar icon
} from "react-icons/fi"; // Neutral icons

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
    date: "", // Add date to form data
  });

  const [status, setStatus] = useState({ message: "", isError: false });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear previous status message
    setStatus({ message: "", isError: false });

    if (!validateForm()) return;

    try {
      const transactionType = formData.type.toUpperCase() as
        | "DEPOSIT"
        | "WITHDRAW"
        | "TRANSFER";

      const transactionId = uuidv4();

      dispatch({
        type: transactionType,
        amount: formData.amount,
        description: formData.description,
        fromAccount:
          formData.type === "withdrawal" || formData.type === "transfer"
            ? formData.fromAccount
            : "",
        toAccount: formData.type === "transfer" ? formData.toAccount : "",
        id: transactionId,
        date: new Date(formData.date), // Add the date here
      });

      setStatus({ message: "Transaction successful!", isError: false });
      resetForm();

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setStatus({
        message: "Transaction failed. Please try again.",
        isError: true,
      });
    }
  };

  const validateForm = () => {
    // Clear previous status message
    setStatus({ message: "", isError: false });

    if (formData.amount <= 0) {
      setStatus({ message: "Amount must be greater than 0", isError: true });
      return false;
    }

    if (!formData.date) {
      setStatus({ message: "Date is required", isError: true });
      return false;
    }

    if (formData.type === "transfer" && !formData.toAccount) {
      setStatus({
        message: "To Account is required for transfers",
        isError: true,
      });
      return false;
    }

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

    return true;
  };

  const resetForm = () => {
    setFormData({
      type: "deposit",
      amount: 0,
      description: "",
      fromAccount: "",
      toAccount: "",
      currency: "USD",
      date: "", // Reset date field
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
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
      className="grid grid-col gap-4 xs:mx-6 sm:mx-40 md:mx-60 xl:mx-96"
    >
      <motion.article
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <h1 className="pt-8">Transaction Form</h1>
        {status.isError && (
          <p className="text-red-500">{status.message}</p>
        )}{" "}
        {/* Show error messages */}
        {!status.isError && status.message && (
          <p className="text-green-500">{status.message}</p>
        )}{" "}
        {/* Show success messages */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.4,
          }}
          onSubmit={handleSubmit}
        >
          <FormInput
            id={uuidv4()}
            label={
              <span className="flex items-center gap-2">
                <FiType /> Type
              </span>
            }
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
            label={
              <span className="flex items-center gap-2">
                <FiHash /> Amount
              </span>
            }
            placeholder="Enter amount"
            value={formData.amount || ""}
            onChange={(value) => {
              const numericValue = parseFloat(value);
              setFormData((prev) => ({
                ...prev,
                amount: isNaN(numericValue) ? 0 : numericValue,
              }));
            }}
          />
          <FormInput
            id={uuidv4()}
            label={
              <span className="flex items-center gap-2">
                <FiGlobe /> Currency
              </span>
            }
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
            label={
              <span className="flex items-center gap-2">
                <FiClipboard /> Description
              </span>
            }
            placeholder="Enter description"
            value={formData.description}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
          />

          <FormInput
            type="date" // Set the input type to "date"
            id={uuidv4()}
            label={
              <span className="flex items-center gap-2">
                <FiCalendar /> Date
              </span>
            }
            value={formData.date}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, date: value }))
            }
          />
          {formData.type !== "deposit" && (
            <FormInput
              type="text"
              id={uuidv4()}
              label={
                <span className="flex items-center gap-2">
                  <FiUser /> From Account
                </span>
              }
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
              label={
                <span className="flex items-center gap-2">
                  <FiUser /> To Account
                </span>
              }
              placeholder="Enter to account"
              value={formData.toAccount}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, toAccount: value }))
              }
            />
          )}

          <Button text="Submit" onClick={() => {}} />
        </motion.form>
      </motion.article>
    </motion.section>
  );
}
