import { useEffect, useState, type JSX } from "react";
import Button from "./Button";
import CodePanel from "./CodePanel";
import PreviewPanel from "./PreviewPanel";
import type { PlaygroundProps } from "./types";
import printCode from "../utils";

const Playground = (props: PlaygroundProps): JSX.Element => {
  const { code, loading } = props;
  const [previewUrl, setPreviewUrl] = useState<string>("");

  let codeToPrint: string;
  if (code) {
    codeToPrint = printCode(code);
  } else {
    codeToPrint = "";
  }
  useEffect(() => {
    console.log(codeToPrint);
    if (!codeToPrint) return;
    let fetchUrl = async () => {
      const res = await fetch("http://localhost:3000/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeToPrint }),
      });
      const data = await res.json();
      setPreviewUrl(data?.url);
    };
    fetchUrl();
  }, [codeToPrint]);
  const [activePanel, setActivePanel] = useState<string>("code");
  return (
    <div className="bg-[#020617]">
      <div className="w-full bg-[#0b1220] flex gap-2 py-3.5 px-4 border-b border-slate-700/50">
        <Button
          label="Preview"
          size="xs"
          onClick={() => setActivePanel("preview")}
          loading={false}
          color="primary"
          tailwindClasses={` font-bold ${activePanel === "preview" ? "bg-[#020617]" : "bg-transparent "} hover:bg-[#020617] `}
        />
        <Button
          label="Code"
          size="xs"
          onClick={() => setActivePanel("code")}
          loading={false}
          color="primary"
          tailwindClasses={`font-bold ${activePanel === "code" ? "bg-[#020617]" : "bg-transparent "} hover:bg-[#020617] `}
        />
      </div>
      {activePanel === "code" ? (
        <CodePanel isStreaming={loading} finalCode={codeToPrint} />
      ) : (
        <PreviewPanel previewUrl={previewUrl} />
      )}
    </div>
  );
};

export default Playground;
