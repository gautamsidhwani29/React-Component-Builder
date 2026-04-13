import { useEffect, useState, type JSX } from "react";
import Button from "../components/Button";
import PromptInput from "../components/PromptInput";
import SuggestionChip from "../components/SuggestionChip";
import type { PromptBarProps } from "./types";
import toast from "react-hot-toast";

const PromptBar = (props: PromptBarProps): JSX.Element => {
  const { prompt, onPromptChange, onGenerate, isLoading } = props;
  const [keyInput, setKeyInput] = useState<string>("");
  const [isKeyHidden, setIsKeyHidden] = useState<boolean>(true);
  const EXAMPLE_PROMPTS = [
    "A dark pricing card with monthly/annual toggle",
    "A user profile card with avatar and social links",
    "A notification toast with progress bar",
    "A login form with email and password",
    "A testimonial card with star ratings",
    "A stats dashboard card with charts",
  ];
  useEffect(() => {
    let key = localStorage.getItem("gemini_api_key");
    if (!key) {
      setKeyInput("");
    } else {
      setKeyInput(key);
    }
  }, []);

  return (
    <>
      <div className="bg-[#0B1220] border-r border-slate-700/50">
        {/* branding */}
        <div className="flex items-center justify-start gap-3 px-2 py-4 border-b border-slate-700/50 ">
          <div className="w-7 h-7 bg-linear-to-br from-violet-500 to-indigo-600 rounded-lg" />
          <p className="text-white font-black">React Component Builder</p>
        </div>

        {/* key prompt */}
        <div className=" gap-1 py-4">
          <div className="py-2 px-2 ">
            {" "}
            <label
              htmlFor="gemini-key"
              className="text-gray-400 font-bold text-l"
            >
              Gemini API Key
            </label>
          </div>
          <div className="flex py-2 px-2  gap-2">
            <input
              onChange={(e) => setKeyInput(e.target.value)}
              value={keyInput}
              type={isKeyHidden ? "password" : "text"}
              id="gemini-key"
              placeholder="Paste your gemini key here..."
              className="text-white text-sm bg-gray-900 rounded rounded-l px-2 py-2"
            />
            <Button
              label="Show"
              size="xs"
              onClick={() => setIsKeyHidden((value) => !value)}
              loading={false}
              color="primary"
              tailwindClasses="font-bold bg-gray-900 hover:bg-gray-800"
            />
            <Button
              label="Save"
              size="xs"
              onClick={() => {
                localStorage.setItem("gemini_api_key", keyInput);
                toast.success("Saved")
              }}
              loading={false}
              color="primary"
              tailwindClasses="font-bold"
            />
          </div>
        </div>

        {/* Component Prompt */}
        <div className="border-t border-slate-700/50 py-8 px-2 flex flex-col gap-5">
          <PromptInput
            onChangeHandler={(e) => onPromptChange(e.target.value)}
            value={prompt}
            placeholder="Describe your UI component"
            tailwindClasses="text-white border-slate-700/50 h-35 w-full bg-gray-900"
          />
          <Button
            loading={isLoading}
            label="Generate Component"
            size="sm"
            color="primary"
            onClick={() => onGenerate()}
            tailwindClasses=""
          />
        </div>

        {/* Example Prompts */}
        <div className="border-t border-slate-700/50 py-4 px-2 flex flex-col gap-2">
          <p className="text-gray-500">Try an example: </p>
          {EXAMPLE_PROMPTS.map((example_text, key) => (
            <SuggestionChip
              key={key}
              text={example_text}
              onClick={() => {
                onPromptChange(example_text);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PromptBar;
