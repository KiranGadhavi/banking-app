import FormInput from "@/app/components/FormInput";
import React from "react";
import { FiHash } from "react-icons/fi";

interface AmountInputProps {
  amount: number;
  onChange: (value: number) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, onChange }) => {
  return (
    <FormInput
      type="number"
      id="amount"
      label={
        <span className="flex items-center gap-2">
          <FiHash /> Amount
        </span>
      }
      placeholder="Enter amount"
      value={amount || ""}
      onChange={(value) => {
        const numericValue = parseFloat(value);
        onChange(isNaN(numericValue) ? 0 : numericValue);
      }}
    />
  );
};

export default AmountInput;
