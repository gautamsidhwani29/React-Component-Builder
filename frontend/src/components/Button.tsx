import type { JSX } from "react";
import LoadingSpinner from "./LoadingSpinner";
import type { ButtonProps } from "./types";

const Button = (props: ButtonProps): JSX.Element => {
  const { label, size, color, loading, tailwindClasses, onClick } = props;
  const sizeClass = {
    xs: "px-2 py-1 text-xs h-8",
    sm: "px-4 py-3 text-lg h-10",
    md: "px-4 py-2 text-xl h-12",
    lg: "px-6 py-6 text-xl h-12",
  }[size];

  const colorClass = {
    primary: "bg-[#5046e4] hover:bg-[#453CC9] text-white",
    secondary: "bg-[#e0e7ff]  hover:bg-[#c7d2fe]  text-[#4740b1]",
  }[color];

  const loadingColorClass = {
    primary: "bg-blue-400",
    secondary: "bg-gray-400",
  }[color];

  return (
    <button
      className={` ${sizeClass} ${loading ? loadingColorClass : colorClass} flex rounded-md justify-center items-center cursor-pointer font-medium relative ${tailwindClasses} `}
      disabled={loading}
      onClick={onClick}
    >
      <span className={loading ? "opacity-0" : "opacity-100"}>{label}</span>
      {loading && (
        <span className="flex items-center justify-center absolute">
          <LoadingSpinner />
        </span>
      )}
    </button>
  );
};

export default Button;
