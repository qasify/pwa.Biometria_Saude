import React from "react";
import { NavButtonProps } from "./NavButton.types";


const NavButton: React.FC<NavButtonProps> = ({ imageSrc, altText, text, href, onClick }) => {
  return (
    <div className="flex items-center space-x-4 w-full" onClick={onClick}>
      <img src={imageSrc} alt={altText} className="rounded-full object-cover w-20 h-20" />
      {href ? (
        <a href={href} className="text-lg font-semibold text-black hover:underline">
          {text}
        </a>
      ) : (
        <span className="text-2xl font-bold">{text}</span>
      )}
    </div>
  );
};

export default NavButton;