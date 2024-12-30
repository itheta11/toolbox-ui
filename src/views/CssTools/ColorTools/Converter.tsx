import { useEffect, useMemo, useState } from "react";
import { delay } from "../../../helpers";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import colorConversion, {
  getHslaComponents,
  getHslComponents,
  getRgbaComponents,
  getRgbComponents,
} from "../../../helpers/color/color-converter";
import ColorGnerator from "../../../helpers/color/color-generator";

const intialColorValues = {
  hex: "",
  rgb: "",
  rgba: "",
  hsl: "",
  hsla: "",
};
const Converter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [colorUnits, setColorUnits] = useState(new Set(["hex"]));
  const [resultValue, setResultValue] = useState(
    JSON.parse(JSON.stringify(intialColorValues))
  );
  const selectedColorUnit = useMemo(
    () => Array.from(colorUnits).join(", ").replace(/_/g, ""),
    [colorUnits]
  );

  useEffect(() => {
    setResultValue(JSON.parse(JSON.stringify(intialColorValues)));
  }, [selectedColorUnit]);

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

  const convert = (val: string) => {
    debugger;
    const colorConverion = new ColorGnerator();
    if (selectedColorUnit === "hex") {
      colorConverion.extractFromHex(val);
    }

    if (selectedColorUnit === "rgb") {
      const { r, g, b } = getRgbComponents(val);
      colorConverion.extractFromRGBA(
        { red: r, green: g, blue: b, alpha: 1 },
        null
      );
    }

    if (selectedColorUnit === "rgba") {
      const { r, g, b, a } = getRgbaComponents(val);
      colorConverion.extractFromRGBA(
        { red: r, green: g, blue: b, alpha: a },
        null
      );
    }

    if (selectedColorUnit === "hsl") {
      const { h, s, l } = getHslComponents(val);
      colorConverion.extractFromHSLA(h, s * 100, l * 100, 1);
    }

    if (selectedColorUnit === "hsla") {
      const { h, s, l, a } = getHslaComponents(val);
      colorConverion.extractFromHSLA(h, s * 100, l * 100, a);
    }
    setResultValue({
      hex: colorConverion.toHEX(),
      rgb: colorConverion.toRGB(),
      rgba: colorConverion.toRGBA(),
      hsl: colorConverion.toHSL(),
      hsla: colorConverion.toHSLA(),
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <h4> Color unit conversion</h4>
      <div
        className="w-[640px] h-[350px] p-4 bg-slate-800 bg-opacity-50 rounded-md flex gap-4
       border-1 border-slate-500"
      >
        <div className="flex-[2] border-r-1 border-r-slate-500 border-opacity-80 p-2">
          <div className="flex justify-between">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="capitalize"
                  size="sm"
                  variant="bordered"
                  color="primary"
                >
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

          <ColorInput unit={selectedColorUnit} convert={convert} />
        </div>
        <div className="flex-1  ">
          All Units
          <div
            className="w-14 h-10 my-2 rounded-md"
            style={{ backgroundColor: resultValue.hex }}
          ></div>
          <ul className="">
            <li>
              HEX <span className="text-sm">- {resultValue.hex}</span>
            </li>
            <li>
              RGB <span className="text-sm">- {resultValue.rgb}</span>
            </li>
            <li>
              RGBA <span className="text-sm">- {resultValue.rgba}</span>
            </li>
            <li>
              HSL <span className="text-sm">- {resultValue.hsl}</span>
            </li>
            <li>
              HSLA <span className="text-sm">- {resultValue.hsla}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

interface ColorInputProp {
  unit: string;
  convert: (unit: string) => void;
}

const ColorInput: React.FC<ColorInputProp> = ({ unit, convert }) => {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState({
    red: 0,
    green: 0,
    blue: 0,
  });

  const [rgba, setRgba] = useState({
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
  });

  const [hsl, setHsl] = useState({
    h: 0,
    s: 0,
    l: 0,
  });

  const [hsla, setHsla] = useState({
    h: 0,
    s: 0,
    l: 0,
    a: 0,
  });

  const setUnitValue = () => {
    debugger;
    let unitValue = "";
    if (unit === "hex") {
      unitValue = "#" + hex;
    }

    if (unit === "rgb") {
      unitValue = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
    }

    if (unit === "rgba") {
      unitValue = `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;
    }

    if (unit === "hsl") {
      unitValue = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }

    if (unit === "hsla") {
      unitValue = `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
    }
    convert(unitValue);
  };
  return (
    <div className=" p-2 flex justify-between">
      {/* <span>{unit}</span> */}
      <div className="w-[200px]">
        {unit === "hex" && (
          <div className="flex">
            #
            <Input
              size="sm"
              type="text"
              maxLength={6}
              value={hex}
              onChange={(e) => setHex(e.target.value)}
            />
          </div>
        )}
        {unit === "rgb" && (
          <div className="flex gap-2 flex-col">
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "red" }} className="w-[50px]">
                Red
              </span>
              <Input
                value={rgb.red.toString()}
                className="w-[100px]"
                type="number"
                max={255}
                maxLength={3}
                onChange={(e) =>
                  setRgb((prev) => {
                    return {
                      ...prev,
                      red: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "green" }} className="w-[50px]">
                Green
              </span>
              <Input
                value={rgb.green.toString()}
                className="w-[100px]"
                type="number"
                max={255}
                maxLength={3}
                onChange={(e) =>
                  setRgb((prev) => {
                    return {
                      ...prev,
                      green: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "blue" }} className="w-[50px]">
                Blue
              </span>
              <Input
                value={rgb.blue.toString()}
                className="w-[100px]"
                type="number"
                max={255}
                maxLength={3}
                onChange={(e) =>
                  setRgb((prev) => {
                    return {
                      ...prev,
                      blue: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
          </div>
        )}

        {unit === "rgba" && (
          <div className="flex gap-2 flex-col">
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "red" }} className="w-[50px]">
                Red
              </span>
              <Input
                value={rgba.red.toString()}
                className="w-[100px]"
                type="number"
                max={255}
                maxLength={3}
                onChange={(e) =>
                  setRgba((prev) => {
                    return {
                      ...prev,
                      red: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "green" }} className="w-[50px]">
                Green
              </span>
              <Input
                value={rgba.green.toString()}
                className="w-[100px]"
                type="number"
                max={255}
                maxLength={3}
                onChange={(e) =>
                  setRgba((prev) => {
                    return {
                      ...prev,
                      green: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "blue" }} className="w-[50px]">
                Blue
              </span>
              <Input
                value={rgba.blue.toString()}
                className="w-[100px]"
                type="number"
                max={255}
                maxLength={3}
                onChange={(e) =>
                  setRgba((prev) => {
                    return {
                      ...prev,
                      blue: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "blue" }} className="w-[50px]">
                Alpha
              </span>
              <Input
                value={rgba.blue.toString()}
                className="w-[100px]"
                type="number"
                max={1}
                maxLength={1}
                onChange={(e) =>
                  setRgba((prev) => {
                    return {
                      ...prev,
                      alpha: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
          </div>
        )}

        {unit === "hsl" && (
          <div className="flex gap-2 flex-col">
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "red" }} className="w-[50px]">
                H
              </span>
              <Input
                value={hsl.h.toString()}
                className="w-[100px]"
                type="number"
                max={360}
                maxLength={3}
                onChange={(e) =>
                  setHsl((prev) => {
                    return {
                      ...prev,
                      h: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "green" }} className="w-[50px]">
                S
              </span>
              <Input
                value={hsl.s.toString()}
                className="w-[100px]"
                type="number"
                max={100}
                maxLength={2}
                onChange={(e) =>
                  setHsl((prev) => {
                    return {
                      ...prev,
                      s: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "green" }} className="w-[50px]">
                L
              </span>
              <Input
                value={hsl.l.toString()}
                className="w-[100px]"
                type="number"
                max={100}
                maxLength={2}
                onChange={(e) =>
                  setHsl((prev) => {
                    return {
                      ...prev,
                      l: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
          </div>
        )}

        {unit === "hsla" && (
          <div className="flex gap-2 flex-col">
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "red" }} className="w-[50px]">
                H
              </span>
              <Input
                value={hsla.h.toString()}
                className="w-[100px]"
                type="number"
                max={360}
                maxLength={3}
                onChange={(e) =>
                  setHsla((prev) => {
                    return {
                      ...prev,
                      h: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "green" }} className="w-[50px]">
                S
              </span>
              <Input
                value={hsla.s.toString()}
                className="w-[100px]"
                type="number"
                max={100}
                maxLength={2}
                onChange={(e) =>
                  setHsla((prev) => {
                    return {
                      ...prev,
                      s: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "green" }} className="w-[50px]">
                L
              </span>
              <Input
                value={hsla.l.toString()}
                className="w-[100px]"
                type="number"
                max={100}
                maxLength={2}
                onChange={(e) =>
                  setHsla((prev) => {
                    return {
                      ...prev,
                      l: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <span style={{ color: "green" }} className="w-[50px]">
                A
              </span>
              <Input
                value={hsla.a.toString()}
                className="w-[100px]"
                type="number"
                max={1}
                onChange={(e) =>
                  setHsla((prev) => {
                    return {
                      ...prev,
                      a: parseInt(e.target.value),
                    };
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className=" right-2">
        <Button size="sm" color="primary" onClick={setUnitValue}>
          Convert
        </Button>
      </div>
    </div>
  );
};

export default Converter;
