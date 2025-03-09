import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TbPencil } from "react-icons/tb";
import { FaCaretDown } from "react-icons/fa";

const locations = ["New York", "Los Angeles", "São Paulo", "Tokyo", "London"];

const LocationDropdown = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="flex space-x-2 items-center">
        <div className="flex items-center gap-3 w-full px-4 py-2 text-gray-900 bg-gray-5 rounded-lg shadow-md">
          {/* @ts-ignore */}
          <FiSearch Pin className="text-gray-500" size={24} />
          {/* <input
            value={selectedLocation || "Onde você está?"}
            className="bg-transparent focus:outline-none"
          /> */}
          <span>{selectedLocation || "Onde você está?"}</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {/* @ts-ignore */}
          <FaCaretDown className="text-gray-500" size={42} />
        </button>
        {/* @ts-ignore */}
        <TbPencil className="text-gray-500" size={30} />
      </div>

      {isOpen && (
        <ul className="absolute left-0 z-10 w-full mt-2 bg-gray-5 rounded-lg ">
          {locations.map((location, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedLocation(location);
                setIsOpen(false);
              }}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationDropdown;
