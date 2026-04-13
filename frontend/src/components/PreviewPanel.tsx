import type { PreviewPanelProps } from "./types";

const PreviewPanel = (props: PreviewPanelProps) => {
  const { previewUrl } = props;
  console.log(previewUrl);
  return (
    <>
      <div className="w-full h-screen">
        {previewUrl ? (
          <iframe src={previewUrl} className="w-full h-full border-0" />
        ) : (
          <div className="flex justify-center items-center h-screen text-white">
            Building Preview...
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewPanel;
