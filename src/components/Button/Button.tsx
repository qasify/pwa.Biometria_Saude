// src/components/Button.tsx
import React from "react";
import { ButtonProps } from "./Button.types";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({
  variant = "filled",
  isLoading = false,
  onClick,
  children,
  className,
  disabled,
  ...rest
}) => {
  const styles = {
    bordered:
      "bg-white hover:bg-hover-light text-gray-3-dark border border-gray-3-dark",
    filled: "bg-black hover:bg-hover-dark text-white",
    disabled: "bg-hover-dark text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-max py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        styles[variant]
      } ${disabled && styles.disabled} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
      {isLoading && (
        <div
          className={`absolute right-1 loader border-t-[3px] rounded-full border-gray-3 animate-spin aspect-square w-8 flex justify-center items-center ${
            disabled ? "bg-hover-dark" : "bg-black"
          }`}
        />
      )}
    </button>
  );
};

export default Button;
