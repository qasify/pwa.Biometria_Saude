import React from "react";
import { ProblemItemProps } from "./ProblemItem.types";

const ProblemItem: React.FC<ProblemItemProps> = ({
  label,
  icon,
  onClick,
  color,
  text,
}) => {
  return (
    <button
      className="px-4 h-14 w-full text-md rounded-lg flex items-center self-center space-x-20"
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {icon}
      {label}
    </button>
  );
};

export default ProblemItem;
