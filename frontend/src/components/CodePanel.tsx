import { Monitor, Copy, Pencil, Code } from "lucide-react";
import type { JSX } from "react";
import type { CodePanelProps } from "./types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const CodePanel = (props: CodePanelProps): JSX.Element => {
  const { finalCode, isStreaming } = props;
  if (isStreaming) {
    return (
      <div className="flex h-screen justify-center items-center ">
        <LoadingSpinner tailwindClasses="h-8 w-8" />
      </div>
    );
  } else if (finalCode) {
    return (
      <div>
        <div className="text-white flex gap-3 p-2 justify-between ">
          <p className="text-gray-500/90 text-xl font-bold flex gap-2">
            <Code /> React
          </p>
          <div className="flex gap-3">
            <Copy
              className="hover:text-gray-600/80 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(finalCode);
                toast.success("Copied to clipboard");
              }}
            />
            <Pencil className="hover:text-gray-600/80 cursor-pointer" />
          </div>
        </div>

        <pre className="text-gray-300/80 p-4 h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            PreTag="span"
            wrapLongLines={true}
            customStyle={{
              margin: 0,
              padding: 0,
              background: "transparent",
              width: "100%",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
            codeTagProps={{
              style: {
                display: "block",
                width: "100%",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                fontSize: "16px",
              },
            }}
          >
            {finalCode}
          </SyntaxHighlighter>
        </pre>
      </div>
    );
  } else {
    return (
      <div className=" bg-[#0b1220] h-full w-full flex flex-col items-center justify-center   ">
        <Monitor className="text-gray-500 size-10 mb-2" />
        <p className="text-l text-gray-500">
          Describe a component to see a live preview
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Your generated UI will appear here
        </p>
      </div>
    );
  }
};

export default CodePanel;
