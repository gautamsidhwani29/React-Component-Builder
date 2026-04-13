import Button from "./Button";
import VariantCard from "./VariantCard";

const VariantPanel = () => {
  return (
    <div className="bg-[#0B1220] border-l border-slate-700/50">
      <div className="border-b border-slate-700/50 py-3.5 px-2 flex justify-between">
        <p className="font-bold text-gray-500">Variants</p>
        <Button
          onClick={() => {}}
          label="Refresh"
          color="primary"
          size="xs"
          loading={false}
          tailwindClasses="bg-transparent"
        />
      </div>
      <div>
        <VariantCard />
      </div>
    </div>
  );
};

export default VariantPanel;
