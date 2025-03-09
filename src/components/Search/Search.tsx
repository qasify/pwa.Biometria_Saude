import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="flex items-center gap-3 w-full px-4 py-2 text-gray-900 bg-gray-5-light rounded-lg shadow-md">
      {/* @ts-ignore */}
      <FiSearch Pin className="text-gray-2" size={24} />
      <input
        placeholder="Onde você está?"
        className="bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default Search;
