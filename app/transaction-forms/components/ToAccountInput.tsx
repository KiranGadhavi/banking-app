import FormInput from "@/app/components/FormInput";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { validateIBAN } from "../../utils/ibanValidation";

interface ToAccountInputProps {
  toAccount: string;
  onChange: (value: string) => void;
}

const ToAccountInput: React.FC<ToAccountInputProps> = ({
  toAccount,
  onChange,
}) => {
  const [error, setError] = useState<string>("");

  const handleChange = (value: string) => {
    onChange(value);
    if (value && !validateIBAN(value)) {
      setError("Invalid IBAN format");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <FormInput
        type="text"
        id="to-account"
        label={
          <span className="flex items-center gap-2">
            <FiUser /> To Account (IBAN)
          </span>
        }
        placeholder="Enter IBAN"
        value={toAccount}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ToAccountInput;
