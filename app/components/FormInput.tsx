import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FormInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string | number; // Accepts string or number
  className?: string;
  onChange?: (value: string) => void; // Keep as string since it will pass a string from input
  type?: "text" | "number" | "password" | "email" | "select"; // Added "select"
  options?: Option[]; // Options for select input
}

export default function FormInput({
  id,
  label,
  placeholder,
  value,
  className,
  type,
  onChange,
  options,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select
          id={id}
          className={`border border-gray-300 rounded-md p-2 w-full ${className}`}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        >
          <option value="">Select an option</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type || "text"}
          className={`border border-gray-300 rounded-md p-2 w-full ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      )}
    </div>
  );
}
