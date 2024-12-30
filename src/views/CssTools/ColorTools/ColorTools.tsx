import { Button, Tab, Tabs } from "@nextui-org/react";
import ColorPallets from "./ColorPalets";
import SuspenseSpinner from "../../../components/Spinner/SuspenseSpinner.tsx";
import { lazy, Suspense, useState } from "react";
import Accessibility from "./Accessibility.tsx";
import Converter from "./Converter.tsx";
import Gradient from "./Gradient.tsx";
import { IoColorPalette, IoWarning } from "react-icons/io5";
import { SiConvertio } from "react-icons/si";
import { MdGradient } from "react-icons/md";
import { FaPalette } from "react-icons/fa";

interface TabItem {
  id: string;
  lable: string;
  content: any;
}

const LazyColorPallete = lazy(() => import("./ColorPalets.tsx"));
const LazyAccessibility = lazy(() => import("./Accessibility.tsx"));
const intialTabState = [
  {
    id: "pallete",
    lable: "pallete",
    content: null,
  },
  {
    id: "converter",
    lable: "converter",
    content: null,
  },
  {
    id: "gradient",
    lable: "gradient",
    content: null,
  },
  {
    id: "accessibility",
    lable: "accessibility",
    content: null,
  },
];

const ColorTools = () => {
  const [tabs, setTabs] = useState<TabItem[]>(
    JSON.parse(JSON.stringify(intialTabState))
  );
  const [selected, setSelected] = useState("pallete");

  const [loading, setLoading] = useState(false);

  const GetTabItemContent = ({ id }) => {
    if (id !== selected) return null;

    if (id === "pallete") {
      return <ColorPallets />;
    } else if (id === "converter") {
      return <Converter />;
    } else if (id === "gradient") {
      return <Gradient />;
    } else if (id === "accessibility") {
      return <Accessibility />;
    }
  };
  const onTabSelection = (key: string) => {
    const newTabs = intialTabState.map((tab) => {
      return {
        ...tab,
        content: tab.id === key ? tab.content : null,
      };
    });
    setTabs([...newTabs]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="w-full pb-2 border-b-2 border-slate-400">
        <h2 className="text-3xl font-extrabold tracking-tight">Colors</h2>
      </div>
      <div className="flex-auto h-[calc(100vh-80px)] p-2 flex w-full flex-col">
        <Tabs
          aria-label="Dynamic tabs"
          color="primary"
          variant="bordered"
          items={tabs}
          selectedKey={selected}
          onSelectionChange={(key) => {
            setSelected(key.toString());
            onTabSelection(key.toString());
          }}
        >
          {(item) => (
            <Tab
              key={item.id}
              title={<Tabtitle id={item.id} lable={item.lable} />}
            >
              <Suspense fallback={<SuspenseSpinner />}>
                <GetTabItemContent id={item.id} />
              </Suspense>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

const Tabtitle = ({ id, lable }) => {
  return (
    <div className="flex justify-center items-center gap-1 space-x-2">
      {id === "pallete" ? <FaPalette className="text-xl" /> : null}
      {id === "converter" ? <SiConvertio className="text-xl" /> : null}
      {id === "gradient" ? <MdGradient className="text-xl" /> : null}
      {id === "accessibility" ? <IoWarning className="text-xl" /> : null}
      {lable}
    </div>
  );
};

export default ColorTools;
