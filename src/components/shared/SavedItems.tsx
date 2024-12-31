import { useSelector } from "react-redux";
import { JsonItem } from "../../store/localstorage";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "@nextui-org/react";
import moment from "moment";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import httpRequest from "../../services/http-request";
import { JsonItemApi, Jsonschemas } from "../../constants/api-endpoints";

interface SavedItemsProps {
  isShow: boolean;
  selectNewItem: () => void;
  selectItem: (jsonItem: JsonItem) => void;
}
const SavedItems: React.FC<SavedItemsProps> = ({
  isShow,
  selectNewItem,
  selectItem,
}) => {
  const items = useSelector((state: any): JsonItem[] => state.jsonItems.items);
  const [isLoading, setIsLoading] = useState(false);

  // // useEffect(() => {
  // //   setIsLoading(true);
  // //   httpRequest
  // //     .fetch(JsonItemApi.GET_ALL)
  // //     .then((response) => {
  // //       console.log("response", response);
  // //     })
  // //     .finally(() => {
  // //       setIsLoading(false);
  // //     });
  // // }, []);

  return (
    <AnimatePresence initial={false}>
      {isShow ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          key="box"
          className="w-60 h-full p-2 border-1 border-slate-500 rounded-md"
        >
          <div className="my-3 flex justify-between">
            <h3>Saved Items</h3>
            <Button size="sm" onClick={selectNewItem}>
              <IoIosAddCircle />
              Add
            </Button>
          </div>
          <ul className="flex flex-col gap-2">
            {items &&
              items.map((item) => (
                <JsonPanelItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  modifiedAt={item.modifiedAt}
                  selectItem={() => selectItem(item)}
                />
              ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const getformattedDate = (isoString: string) =>
  moment(isoString).format("DD-MM-YYYY HH:mm:ss");
const JsonPanelItem: React.FC<{
  id: string;
  title: string;
  modifiedAt: string;
  selectItem: () => void;
}> = ({ id, title, modifiedAt, selectItem }) => {
  return (
    <li className="p-2 bg-slate-700 rounded-md text-sm flex flex-col gap-2">
      <p className=" cursor-pointer" onClick={selectItem}>
        {title || id}
      </p>
      <p className="ml-auto">
        <em className="text-xs text-slate-400">
          {getformattedDate(modifiedAt)}
        </em>
      </p>
    </li>
  );
};
export default SavedItems;
function useSate(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
