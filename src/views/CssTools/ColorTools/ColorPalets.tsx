import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ColorShades, getAllColors } from "../../../data/colors";
import { useEffect, useMemo, useRef, useState } from "react";
import colorConversion from "../../../helpers/color/color-converter";
import ColorGnerator from "../../../helpers/color/color-generator";
import { delay } from "../../../helpers";
import Spinner from "../../../components/Spinner/Spinner";
const ALL_COLORS = getAllColors();
const ColorPallets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [colorUnits, setColorUnits] = useState(new Set(["hex"]));
  const selectedColorUnit = useMemo(
    () => Array.from(colorUnits).join(", ").replace(/_/g, ""),
    [colorUnits]
  );

  const handleSelectionChange = async (key) => {
    try {
      setIsLoading(true);
      setColorUnits((_) => new Set(key));
      await delay(300);
    } catch (er) {
      console.error(er);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-2 flex gap-4 items-center">
        <Spinner isShow={isLoading} />
        <h3 className="text-xl font-bold">Unit</h3>
        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize" variant="bordered" color="primary">
              {selectedColorUnit}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Single selection example"
            selectedKeys={colorUnits}
            selectionMode="single"
            variant="faded"
            onSelectionChange={handleSelectionChange}
          >
            <DropdownItem key="hex">Hex</DropdownItem>
            <DropdownItem key="rgb">rgb</DropdownItem>
            <DropdownItem key="rgba">rgba</DropdownItem>
            <DropdownItem key="hsl">hsl</DropdownItem>
            <DropdownItem key="hsla">hsla</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {Object.keys(ALL_COLORS).map((color, index) => (
        <ColorSection
          key={index}
          colorType={color}
          shades={ALL_COLORS[color]}
          currentUnit={selectedColorUnit}
        />
      ))}
    </div>
  );
};

const ColorSection: React.FC<{
  colorType: string;
  shades: ColorShades;
  currentUnit: string;
}> = ({ colorType, shades, currentUnit }) => {
  return (
    <div className="p-2 m-2 flex flex-col gap-2">
      <h4 className="capitalize">{colorType}</h4>
      <div className="flex justify-start gap-2">
        {Object.keys(shades).map((shade, index) => (
          <ColorShade
            key={index}
            shade={shade}
            value={shades[shade]}
            currentUnit={currentUnit}
          />
        ))}
      </div>
    </div>
  );
};

const ColorShade: React.FC<{
  shade: string;
  value: string;
  currentUnit: string;
}> = ({ shade, value, currentUnit }) => {
  const currVal = colorConversion("hex", currentUnit, value);
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-10 w-14 rounded"
        style={{ backgroundColor: value }}
      ></div>
      <div className="">{shade}</div>
      <div className="text-xs text-slate-400">{currVal}</div>
    </div>
  );
};

export default ColorPallets;
