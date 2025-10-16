import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarCheck } from "react-icons/fa";

const DatePickers = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Convert  "DD-MM-YYYY" to Date object
  useEffect(() => {
    if (value) {
      const [day, month, year] = value.split("-");
      setSelectedDate(new Date(`${year}-${month}-${day}`));
    }
  }, [value]);

  const CustomInput = ({ value, onClick }) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white hover:bg-gray-50 transition-colors"
        placeholder="Select Date (DD-MM-YYYY)"
      />
      <div
        className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={onClick}
      >
        <FaCalendarCheck className="text-gray-500 hover:text-gray-700 transition-colors" />
      </div>
    </div>
  );

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        const formatted = date ? date.toLocaleDateString("en-GB") : "";
        console.log(formatted);
        setSelectedDate(date);
        onChange(formatted.replace(/\//g, "-"));
      }}
      dateFormat="dd-MM-yyyy"
      placeholderText="DD-MM-YYYY"
      customInput={<CustomInput />}
      showYearDropdown
      scrollableYearDropdown
      minDate={new Date(1950, 0, 1)}
      maxDate={new Date(2050, 11, 31)}
    />
  );
};

export default DatePickers;
