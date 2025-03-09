import React from "react";
import { ScreenHeaderProps } from "./ScreenHeader.types";

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onClick }) => {
  return <h1 className="px-4 h-10 bg-black text-white text-xl rounded-lg font-bold flex items-center justify-center w-[300px] self-center" onClick={onClick}>{title}</h1>;
};

export default ScreenHeader;
