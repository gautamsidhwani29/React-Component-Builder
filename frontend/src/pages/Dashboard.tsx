import type { JSX } from "react";
import { useState } from "react";
import PromptBar from "../components/PromptBar";
import Playground from "../components/Playground";
import VariantPanel from "../components/VariantPanel";
import generateComponent from "../services/ai/generateComponent";
import type { ModelResponse } from "../components/types";

const Dashboard = (): JSX.Element => {
  const [promptInput, setPromptInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayCode, setDisplayCode] = useState<ModelResponse | null>(null);
  const handleGenerate = async () => {
    setIsLoading(true);
    let { parsed } = await generateComponent(promptInput);
    setDisplayCode(parsed);
    if (parsed) {
      setPromptInput(" ");
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="grid grid-cols-[1fr_4fr_1fr]  h-screen ">
        <PromptBar
          isLoading={isLoading}
          prompt={promptInput}
          onPromptChange={setPromptInput}
          onGenerate={handleGenerate}
        />
        <Playground loading={isLoading} code={displayCode} />
        <VariantPanel />
      </div>
    </>
  );
};
export default Dashboard;
