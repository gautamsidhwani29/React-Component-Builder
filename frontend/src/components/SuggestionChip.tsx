import type { JSX } from "react";
import type { SuggestionChipProps } from "./types";

const SuggestionChip = (props: SuggestionChipProps): JSX.Element => {
  const { text, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={` cursor-pointer bg-gray-900 py-1 px-2 border-[0.5px] rounded-xl border-slate-700/50 text-l text-gray-400 hover:scale-105`}
    >
      {text}
    </div>
  );
};

export default SuggestionChip;
