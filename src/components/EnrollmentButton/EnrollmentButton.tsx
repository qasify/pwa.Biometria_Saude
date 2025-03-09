// src/components/Button.tsx
import React from "react";
import { EnrollmentButtonProps } from "./EnrollmentButton.types";

const EnrollmentButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & EnrollmentButtonProps
> = ({
  variant = "filled",
  isSelected = false,
  onClick,
  children,
  className,
  ...rest
}) => {
  const styles = {
    selected: "bg-black text-white",
    normal: "bg-gray-5 ",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-full h-10 rounded-lg text-sm focus:outline-none focus:shadow-outline  ${
        isSelected ? styles.selected : styles.normal
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default EnrollmentButton;
