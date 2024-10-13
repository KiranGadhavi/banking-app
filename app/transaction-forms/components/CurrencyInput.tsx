import FormInput from "@/app/components/FormInput";
import React from "react";
// import FormInput from "./FormInput"; // Make sure FormInput is correctly imported
import { FiGlobe } from "react-icons/fi";

interface CurrencyInputProps {
  currency: string;
  onChange: (value: string) => void;
}

const currencies = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
];

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  currency,
  onChange,
}) => {
  return (
    <FormInput
      id="currency"
      label={
        <span className="flex items-center gap-2">
          <FiGlobe /> Currency
        </span>
      }
      value={currency}
      onChange={onChange}
      type="select"
      options={currencies}
    />
  );
};

export default CurrencyInput;
