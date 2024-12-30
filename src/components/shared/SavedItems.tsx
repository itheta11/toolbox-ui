import { useSelector } from "react-redux";
import { JsonItem } from "../../store/localstorage";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "@nextui-org/react";

interface SavedItemsProps {
  isShow: boolean;
  selectNewItem: () => void;
}
const SavedItems: React.FC<SavedItemsProps> = ({ isShow, selectNewItem }) => {
  if (!isShow) return null;
  const items = useSelector((state: any): JsonItem[] => state.jsonItems.items);
  return (
    <div className="w-[200px] h-full p-2 border-1 rounded-md">
      <div className="my-3 flex justify-between">
        <h3>Saved Items</h3>
        <Button size="sm" onClick={selectNewItem}>
          <IoIosAddCircle />
          Add
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {items &&
          items.map((item) => <JsonPanelItem key={item.id} id={item.id} />)}
      </ul>
    </div>
  );
};

const JsonPanelItem: React.FC<{ id: string }> = ({ id }) => {
  return (
    <li className="p-2 bg-slate-500 rounded-md">
      <p className="text-xs">{id}</p>
    </li>
  );
};
export default SavedItems;
