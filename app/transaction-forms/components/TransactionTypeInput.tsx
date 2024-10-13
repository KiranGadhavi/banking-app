import FormInput from "@/app/components/FormInput";
import React from "react";
// import FormInput from "./FormInput"; // Make sure FormInput is correctly imported
import { FiType } from "react-icons/fi";

interface TransactionTypeInputProps {
  type: "deposit" | "withdrawal" | "transfer";
  onChange?: (value: "deposit" | "withdrawal" | "transfer") => void; // Explicitly define the type for onChange
}

const TransactionTypeInput: React.FC<TransactionTypeInputProps> = ({
  type,
  onChange,
}) => {
  const transactionTypes = [
    { value: "deposit", label: "Deposit" },
    { value: "withdrawal", label: "Withdrawal" },
    { value: "transfer", label: "Transfer" },
  ];

  return (
    <FormInput
      id="transaction-type"
      label={
        <span className="flex items-center gap-2">
          <FiType /> Type
        </span>
      }
      value={type}
      onChange={onChange}
      type="select"
      options={transactionTypes}
    />
  );
};

export default TransactionTypeInput;
