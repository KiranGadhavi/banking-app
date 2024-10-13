import FormInput from "@/app/components/FormInput";
import React from "react";
// import FormInput from "./FormInput"; // Make sure FormInput is correctly imported
import { FiUser } from "react-icons/fi";

interface ToAccountInputProps {
  toAccount: string; // Set the type for toAccount
  onChange: (value: string) => void; // Explicitly define the type for onChange
}

const ToAccountInput: React.FC<ToAccountInputProps> = ({
  toAccount,
  onChange,
}) => {
  return (
    <FormInput
      type="text"
      id="to-account"
      label={
        <span className="flex items-center gap-2">
          <FiUser /> To Account
        </span>
      }
      placeholder="Enter to account"
      value={toAccount}
      onChange={onChange}
    />
  );
};

export default ToAccountInput;
