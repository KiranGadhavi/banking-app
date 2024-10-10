"use client";
import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";

export default function Transpage() {
  const [formData, setFormData] = useState({
    type: "",
    amount: 0,
    description: "",
    fromAccount: "",
    toAccount: "",
  });

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: name === "amount" ? parseFloat(value) : value, // Convert amount to a number
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
  };

  // Options for the select input
  const transactionTypes = [
    { value: "deposit", label: "Deposit" },
    { value: "withdrawal", label: "Withdrawal" },
    { value: "transfer", label: "Transfer" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Transaction Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput
            id={uuidv4()} // Generate a new UUID for the ID
            label="Type"
            value={formData.type}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, type: value }))
            } // Update type
            type="select" // Specify that this is a select input
            options={transactionTypes} // Pass the options for the select input
          />
        </div>
        <div>
          <FormInput
            type="number"
            id={uuidv4()} // Generate a new UUID for the ID
            label="Amount"
            placeholder="Enter amount"
            value={formData.amount} // Pass the amount value here
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, amount: parseFloat(value) }))
            } // Update amount as number
          />
        </div>
        <div>
          <FormInput
            type="text"
            id={uuidv4()} // Generate a new UUID for the ID
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            } // Update description
          />
        </div>
        <div>
          <FormInput
            type="text"
            id={uuidv4()} // Generate a new UUID for the ID
            label="From Account"
            placeholder="Enter from account"
            value={formData.fromAccount}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, fromAccount: value }))
            } // Update from account
          />
        </div>
        <div>
          <FormInput
            type="text"
            id={uuidv4()} // Generate a new UUID for the ID
            label="To Account"
            placeholder="Enter to account"
            value={formData.toAccount}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, toAccount: value }))
            } // Update to account
          />
        </div>
        <Button text="submit" />
      </form>
    </div>
  );
}
