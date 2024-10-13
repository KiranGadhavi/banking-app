import FormInput from "@/app/components/FormInput";
import React from "react";
// import FormInput from "./FormInput"; // Make sure FormInput is correctly imported
import { FiClipboard } from "react-icons/fi";

interface DescriptionInputProps {
  description: string; // Set the type for description
  onChange: (value: string) => void; // Explicitly define the type for onChange
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  description,
  onChange,
}) => {
  return (
    <FormInput
      type="text"
      id="description"
      label={
        <span className="flex items-center gap-2">
          <FiClipboard /> Description
        </span>
      }
      placeholder="Enter description"
      value={description}
      onChange={onChange}
    />
  );
};

export default DescriptionInput;
