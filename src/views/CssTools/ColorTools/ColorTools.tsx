import { Button, Tab, Tabs } from "@nextui-org/react";
import ColorPallets from "./ColorPalets";
import SuspenseSpinner from "../../../components/Spinner/SuspenseSpinner.tsx";
import { lazy, Suspense, useState } from "react";
import Accessibility from "./Accessibility.tsx";
import Converter from "./Converter.tsx";
import Gradient from "./Gradient.tsx";

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
          variant="bordered"
          items={tabs}
          selectedKey={selected}
          onSelectionChange={(key) => {
            setSelected(key.toString());
            onTabSelection(key.toString());
          }}
        >
          {(item) => (
            <Tab key={item.id} title={item.lable}>
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

export default ColorTools;
