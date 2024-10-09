import React from "react";

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  className?: string;
  onChange?: (value: string) => void;
  type?: "text" | "number" | "password" | "email";
}
export default function FormInput({
  label,
  placeholder,
  value,
  className,
  type,
  onChange,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        type={type || "text"}
        className={`border border-gray-300 rounded-md p-2 w-full ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
}
