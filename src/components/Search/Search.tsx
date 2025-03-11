import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex items-center gap-3 w-full px-4 py-2 text-gray-900 bg-gray-5-light rounded-lg shadow-md">
      {/* @ts-ignore */}
      <FiSearch Pin className="text-gray-2" size={24} />
      <input
        placeholder={placeholder ?? "Onde você está?"}
        className="bg-transparent focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
