import React from "react";
import ReactDatePicker from "react-datepicker"; // Import the date picker component
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker
import { FiCalendar } from "react-icons/fi"; // Import the calendar icon (optional, for UI)

interface DateInputProps {
  date: Date | null; // Date can be null initially
  onChange: (date: Date | null) => void; // Callback function to handle date changes
}

// DateInput component with the calendar picker
const DateInput: React.FC<DateInputProps> = ({ date, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="date" className="flex items-center gap-2">
        <FiCalendar /> Date
      </label>
      <ReactDatePicker
        selected={date} // Selected date for the calendar
        onChange={(date) => onChange(date)} // Call onChange with the selected date
        dateFormat="yyyy-MM-dd" // Format for the date
        className={`border border-gray-300 rounded-md p-2 w-full text-gray-600 `} // Styling for the date input
        placeholderText="Select a date" // Placeholder text
        isClearable // Allows the user to clear the date
        id="date"
      />
    </div>
  );
};

export default DateInput;
