import type { JSX } from "react";
import type { PromptInputProps } from "./types";

const PromptInput = (props: PromptInputProps): JSX.Element => {
  const { placeholder, tailwindClasses, value, onChangeHandler } = props;
  return (
    <textarea
      className={`px-4 pt-3 resize-none rounded-2xl border border-gray-300 ${tailwindClasses}`}
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export default PromptInput;
