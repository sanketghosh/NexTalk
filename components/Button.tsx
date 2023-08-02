"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export default function Button({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all relative`,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-700" : "text-gray-100",
        danger && "bg-rose-600 focus-visible:outline-rose-700",
        !secondary &&
          !danger &&
          "bg-violet-500 hover:bg-violet-600 focus-visible:outline-violet-600"
      )}
    >
      {children}
    </button>
  );
}
