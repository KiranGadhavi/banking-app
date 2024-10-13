import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FormInputProps<T extends string | number = string> {
  id: string;
  label: React.ReactNode; // Label can be any React node
  placeholder?: string;
  value: string | number; // Accepts string or number
  className?: string;
  onChange?: (value: T) => void; // Callback that takes a string
  type?: "text" | "number" | "password" | "email" | "select" | "date"; // Allowed input types
  options?: Option[]; // Options for select input
  customInput?: React.ReactNode;
}

export default function FormInput<T extends string | number = string>({
  id,
  label,
  placeholder,
  value,
  className = "", // Default to an empty string if not provided
  type = "text", // Default type to "text"
  onChange,
  options,
}: FormInputProps<T>) {
  return (
    <div className="flex flex-col gap-1 my-4">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select
          id={id}
          className={`border border-gray-300 rounded-md p-2 w-full text-gray-600 ${className}`}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value as T)} // Make sure e.target.value is passed
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
          value={value as string} // Assuming value is string for date input
          onChange={(e) => onChange && onChange(e.target.value as T)} // Ensure value is string
        />
      ) : (
        <input
          type={type}
          className={`border border-gray-300 rounded-md p-2 w-full text-gray-600 ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value as T)} // Ensure value is string
        />
      )}
    </div>
  );
}
