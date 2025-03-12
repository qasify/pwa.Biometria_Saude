// src/components/DatePickerField.tsx
import React, { useState, useEffect } from "react";
import { DatePickerProps } from "./DatePicker.types";

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  // Parse the initial date value
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  // Initialize the values from the incoming value
  useEffect(() => {
    if (value) {
      const dateParts = value.split("-");
      if (dateParts.length === 3) {
        setYear(dateParts[0]);
        setMonth(dateParts[1]);
        setDay(dateParts[2]);
      }
    }
  }, [value]);

  // Get current date for validation
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  const currentYear = currentDate.getFullYear();
  
  // Function to get days in a month
  const getDaysInMonth = (month: number, year: number) => {
    // February handling for leap years
    if (month === 2) {
      return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28;
    }
    // April, June, September, November have 30 days
    if ([4, 6, 9, 11].includes(month)) {
      return 30;
    }
    // All other months have 31 days
    return 31;
  };
  
  // Generate appropriate number of days based on selected month and year
  const getDaysArray = () => {
    const selectedMonth = parseInt(month) || currentMonth;
    const selectedYear = parseInt(year) || currentYear;
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    
    // If selected year and month match current year and month, limit days to current day
    if (selectedYear === currentYear && selectedMonth === currentMonth) {
      return Array.from({ length: currentDay }, (_, i) => i + 1);
    }
    
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };
  
  const days = getDaysArray();
  
  // Generate options for months (1-12)
  // If selected year is current year, only show months up to current month
  const getMonthsArray = () => {
    const selectedYear = parseInt(year) || 0;
    if (selectedYear === currentYear) {
      return Array.from({ length: currentMonth }, (_, i) => i + 1);
    }
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };
  
  const months = getMonthsArray();
  
  // Generate options for years (current year - 100 to current year)
  const years = Array.from(
    { length: 100 },
    (_, i) => currentYear - i
  );

  // Check if the current day is valid for the selected month/year
  useEffect(() => {
    if (day && month && year) {
      const daysInSelectedMonth = getDaysInMonth(parseInt(month), parseInt(year));
      if (parseInt(day) > daysInSelectedMonth) {
        // Reset day if it's invalid for the selected month
        setDay("");
      }
    }
  }, [month, year]);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value;
    setDay(newDay);
    updateDate(newDay, month, year);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    updateDate(day, newMonth, year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    setYear(newYear);
    updateDate(day, month, newYear);
  };

  const updateDate = (d: string, m: string, y: string) => {
    if (d && m && y) {
      // Format as YYYY-MM-DD for standard date format
      const formattedDay = d.padStart(2, '0');
      const formattedMonth = m.padStart(2, '0');
      onChange(`${y}-${formattedMonth}-${formattedDay}`);
    }
  };

  return (
    <div className="flex flex-col gap-1 relative w-full">
      <label className="block text-text-light text-sm font-bold">{label}</label>
      <div className="flex space-x-2 w-full">
        {/* Day Select */}
        <select
          value={day}
          onChange={handleDayChange}
          className={`flex-1 shadow appearance-none border rounded py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline h-10 ${
            error ? "border-error" : "border-gray-1"
          }`}
        >
          <option value="">Dia</option>
          {days.map((d) => (
            <option key={`day-${d}`} value={d.toString().padStart(2, '0')}>
              {d}
            </option>
          ))}
        </select>

        {/* Month Select */}
        <select
          value={month}
          onChange={handleMonthChange}
          className={`flex-1 shadow appearance-none border rounded py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline h-10 ${
            error ? "border-error" : "border-gray-1"
          }`}
        >
          <option value="">Mês</option>
          {months.map((m) => (
            <option key={`month-${m}`} value={m.toString().padStart(2, '0')}>
              {m}
            </option>
          ))}
        </select>

        {/* Year Select */}
        <select
          value={year}
          onChange={handleYearChange}
          className={`flex-1 shadow appearance-none border rounded py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline h-10 ${
            error ? "border-error" : "border-gray-1"
          }`}
        >
          <option value="">Ano</option>
          {years.map((y) => (
            <option key={`year-${y}`} value={y.toString()}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p className="absolute text-error text-[12px] bottom-[-16px]">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default DatePicker;