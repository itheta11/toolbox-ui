import { useSelector } from "react-redux";
import { JsonItem } from "../../../store/localstorage";

const SavedItems: React.FC<{ isShow: boolean }> = ({ isShow }) => {
  if (!isShow) return null;
  const items = useSelector((state: any): JsonItem[] => state.jsonItems.items);
  console.log(items);
  return (
    <div className="h-full p-2 border-1 rounded-md">
      <ul className="flex flex-col gap-2">
        {items && items.map((item) => <li key={item.id}>{item.id}</li>)}
      </ul>
    </div>
  );
};

export default SavedItems;
