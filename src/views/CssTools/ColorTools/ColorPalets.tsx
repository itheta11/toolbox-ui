import { ColorShades, getAllColors } from "../../../data/colors";
const ALL_COLORS = getAllColors();
const ColorPallets = () => {
  return (
    <div className="flex flex-col">
      {Object.keys(ALL_COLORS).map((color, index) => (
        <ColorSection
          key={index}
          colorType={color}
          shades={ALL_COLORS[color]}
        />
      ))}
    </div>
  );
};

const ColorSection: React.FC<{ colorType: string; shades: ColorShades }> = ({
  colorType,
  shades,
}) => {
  return (
    <div className="p-2 m-2 flex flex-col gap-2">
      <h4>{colorType}</h4>
      <div className="flex justify-start gap-2">
        {Object.keys(shades).map((shade, index) => (
          <ColorShade key={index} shade={shade} value={shades[shade]} />
        ))}
      </div>
    </div>
  );
};

const ColorShade: React.FC<{
  shade: string;
  value: string;
}> = ({ shade, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-10 w-14 rounded"
        style={{ backgroundColor: value }}
      ></div>
      <div>{shade}</div>
      <div className="text-xs text-slate-400">{value}</div>
    </div>
  );
};

export default ColorPallets;
