import ColorPallets from "./ColorPalets";

const ColorTools = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full pb-2 border-b-2 border-slate-400">
        <h2 className="text-3xl font-extrabold tracking-tight">Colors</h2>
      </div>
      <div className="flex-auto h-[calc(100vh-80px)] flex p-2">
        <ColorPallets />
      </div>
    </div>
  );
};

export default ColorTools;
