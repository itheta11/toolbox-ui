import { Editor } from "@monaco-editor/react";
import { debounce } from "lodash";
import { useState, useRef } from "react";

import JsonConverter from "./Coverters";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import SavedItems from "../../../components/shared/SavedItems";
import MonacoEditor from "../../../components/Editor/MonacoEditor";
import PreviewCode from "../../../components/Editor/PreviewCode";
import Spinner from "../../../components/Spinner/Spinner";
import { JsonItem } from "../../../store/localstorage";
import { addItem, deleteItem, updateItem } from "../../../store/jsonItems";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

const JsonBox = () => {
  console.log("generator check");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewCode, setPreviewCode] = useState("");
  const converter = useRef(null);
  const editorRef = useRef(null);
  const [initalEditorCode, setInitialEditorCode] = useState("");
  const dispatch = useDispatch();
  const [jsonItem, setJsonItem] = useState<JsonItem>({
    id: "",
    title: "",
    value: "",
    createdAt: "",
    modifiedAt: "",
  });
  const [isJsonItemPanelShow, setIsJsonItemPanelShow] = useState(true);
  const items = useSelector((state: any): JsonItem[] => state.jsonItems.items);
  const getConverterType = (converterType: string) => {
    converter.current = converterType;
  };

  const handleDelete = () => {
    if (jsonItem.id) {
      dispatch(deleteItem(jsonItem.id));
    }
  };

  const saveJsonItem = (title) => {
    const isoDate = new Date().toISOString();
    const getCurrEditorCode = editorRef.current.getEditorState();
    if (!jsonItem.id) {
      const newJsonItem: JsonItem = {
        id: v4(),
        title,
        value: getCurrEditorCode,
        createdAt: isoDate,
        modifiedAt: isoDate,
      };
      setJsonItem(newJsonItem);
      dispatch(addItem(newJsonItem));
    } else {
      setJsonItem((prevItem) => {
        return {
          ...prevItem,
          title,
          value: getCurrEditorCode,
          modifiedAt: isoDate,
        };
      });
      dispatch(
        updateItem({
          id: jsonItem.id,
          title,
          value: getCurrEditorCode,
          modifiedAt: isoDate,
        })
      );
    }
  };

  const selectNewItem = () => {
    navigate(0);
    setLoading(true);
  };

  const selectJsonItem = (jsonItem: JsonItem) => {
    setPreviewCode("");
    setInitialEditorCode(jsonItem.value);
    setJsonItem({
      ...jsonItem,
    });
  };
  return (
    <div className="json-box">
      <Spinner isShow={loading} />

      <div className="flex items-center">
        <Link to="../json-tools" className="text-2xl hover:scale-110">
          <MdKeyboardArrowLeft />
        </Link>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-200">
          Json validator
        </h2>
      </div>

      <div className="h-[calc(100vh-50px)] flex items-center">
        <SavedItems
          isShow={isJsonItemPanelShow}
          selectNewItem={selectNewItem}
          selectItem={selectJsonItem}
        />
        <div className="h-full flex-1 flex flex-col">
          <JsonConverter
            className="flex-auto p-2 flex gap-2"
            getConverterType={getConverterType}
            getEditorCode={() => editorRef.current.getEditorState()}
            setPreviewCodeFromEditor={(preview) => setPreviewCode(preview)}
            saveJsonItem={saveJsonItem}
            jsonPanelCloseHandler={() => {
              setIsJsonItemPanelShow((prevState) => !prevState);
            }}
          />
          <div className="flex-auto p-1 bg-slate-800 rounded-lg flex flex-wrap">
            <div className="flex-1 border-r-2 border-r-slate-600">
              <MonacoEditor intialValue={initalEditorCode} ref={editorRef} />
            </div>
            <PreviewCode
              previewCode={previewCode}
              converterType={converter.current}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonBox;
