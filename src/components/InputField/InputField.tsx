// src/components/InputField.tsx
import React from "react";
import { InputFieldProps } from "./InputField.types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  pattern,
}) => {
  return (
    <div className="flex flex-col gap-1 relative">
      <label className="block text-text-light text-sm font-bold">{label}</label>
      <div className="flex justify-center">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline h-10 ${error ? "border-error" : "border-gray-1"
            }`}
          pattern={pattern}
        />
      </div>
      {error ? (
        <p className="absolute text-error text-[12px] bottom-[-16px] ">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
