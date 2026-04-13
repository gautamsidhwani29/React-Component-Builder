import type { JSX } from "react";
import type { LoadingSpinnerProps } from "./types";

const LoadingSpinner = (props: LoadingSpinnerProps): JSX.Element => {
  const { tailwindClasses } = props;
  return (
    <div
      className={`animate-spin h-6 w-6 border-4 border-gray-300 border-t-transparent rounded-full ${tailwindClasses}`}
    ></div>
  );
};

export default LoadingSpinner;
