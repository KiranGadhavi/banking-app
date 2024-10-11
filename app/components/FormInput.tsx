import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FormInputProps {
  id: string;
  label: React.ReactNode; // Change to React.ReactNode
  placeholder?: string;
  value: string | number; // Accepts string or number
  className?: string;
  onChange?: (value: string) => void; // Keep as string since it will pass a string from input
  type?: "text" | "number" | "password" | "email" | "select" | "date"; // Added "date"
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
    <div className="flex flex-col gap-1 my-4">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select
          id={id}
          className={`border border-gray-300 rounded-md p-2 w-full text-gray-600 ${className}`}
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
      ) : type === "date" ? (
        <input
          type="date"
          className={`border border-gray-300 rounded-md p-2 w-full text-gray-600 ${className}`}
          placeholder={placeholder}
          value={value as string} // Casting since value can be string | number
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          className={`border border-gray-300 rounded-md p-2 w-full text-gray-600 ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      )}
    </div>
  );
}
