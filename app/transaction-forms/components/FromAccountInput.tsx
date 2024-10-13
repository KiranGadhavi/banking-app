import FormInput from "@/app/components/FormInput";
import React from "react";
// import FormInput from "./FormInput"; // Make sure FormInput is correctly imported
import { FiUser } from "react-icons/fi";

interface FromAccountInputProps {
  fromAccount: string; // Set the type for fromAccount
  onChange: (value: string) => void; // Explicitly define the type for onChange
}

const FromAccountInput: React.FC<FromAccountInputProps> = ({
  fromAccount,
  onChange,
}) => {
  return (
    <FormInput
      type="text"
      id="from-account"
      label={
        <span className="flex items-center gap-2">
          <FiUser /> From Account
        </span>
      }
      placeholder="Enter from account"
      value={fromAccount}
      onChange={onChange}
    />
  );
};

export default FromAccountInput;
