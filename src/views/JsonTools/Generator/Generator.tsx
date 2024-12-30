import { Editor } from "@monaco-editor/react";
import { debounce, delay } from "lodash";
import { useState, useRef } from "react";

import TypeConverters from "./TypeConverters";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Button, ButtonGroup } from "@nextui-org/react";
import { FaCopy } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import { Generators } from "../../../constants/json-tools";

import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem, deleteItem } from "../../../store/jsonItems";
import { JsonItem } from "../../../store/localstorage";
import { v4 } from "uuid";
import SavedItems from "../../../components/shared/SavedItems";
import MonacoEditor from "../../../components/Editor/MonacoEditor";
import PreviewCode from "../../../components/Editor/PreviewCode";

const Generator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewCode, setPreviewCode] = useState("");
  const converter = useRef(null);
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [jsonItem, setJsonItem] = useState<{ id: string; value: string }>({
    id: "",
    value: "",
  });
  const [isJsonItemPanelShow, setIsJsonItemPanelShow] = useState(true);

  const copyToClipboard = async () => {
    try {
      if (!window.navigator) throw Error("fail to copy to clipboard");
      await window.navigator.clipboard.writeText(previewCode);
      toast.success("successfully copied", {
        autoClose: 500,
        theme: "colored",
      });
    } catch (er) {
      toast.error(er.message, {
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  const handleFileSave = async () => {
    try {
      const fileName = "output";
      // const handle = await window.showDirectoryPicker();
      // const fileHandle = await handle.getFileHandle(fileName, { create: true });

      // const writeable = await fileHandle.createWritable();
      // await writeable.write(previewCode);
      // await writeable.close();

      setLoading(true);
      let fileType = "txt";
      if (converter.current === Generators.JSDOC) {
        fileType = "js";
      } else if (converter.current === Generators.CSHARP) {
        fileType = "cs";
      } else if (converter.current === Generators.CSV) {
        fileType = "csv";
      } else if (converter.current === Generators.XML) {
        fileType = "xml";
      }

      const blob = new Blob([previewCode], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName + "." + fileType;
      anchor.click();

      URL.revokeObjectURL(url);
      toast.success("Successfully downloaded file", {
        autoClose: 1000,
        theme: "colored",
      });
    } catch (er) {
      toast.error(er.message, { autoClose: 1000, theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const getConverterType = (converterType: string) => {
    converter.current = converterType;
  };

  const handleDelete = () => {
    if (jsonItem.id) {
      dispatch(deleteItem(jsonItem.id));
    }
  };

  const saveJsonItem = () => {
    debugger;
    if (!jsonItem.id) {
      const newJsonItem = { id: v4(), value: editorRef.current };
      setJsonItem(newJsonItem);
      dispatch(addItem(newJsonItem));
    } else {
      setJsonItem((prevItem) => {
        return { ...prevItem, value: editorRef.current };
      });
      dispatch(updateItem({ id: jsonItem.id, value: editorRef.current }));
    }
  };

  const selectNewItem = () => {
    navigate(0);
    setLoading(true);
  };
  return (
    <div className="json-box">
      <Spinner isShow={loading} />
      <div className="flex items-center">
        <Link to="../json-tools" className="text-2xl hover:scale-110">
          <MdKeyboardArrowLeft />
        </Link>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-200">
          Type Generators
        </h2>
      </div>

      <div className="h-[calc(100vh-50px)] flex items-center">
        <SavedItems
          isShow={isJsonItemPanelShow}
          selectNewItem={selectNewItem}
        />
        <div className="h-full flex-1 flex flex-col">
          <TypeConverters
            className="flex-auto p-2 flex gap-2"
            getConverterType={getConverterType}
            getEditorCode={() => editorRef.current}
            setPreviewCodeFromEditor={(preview) => setPreviewCode(preview)}
            saveJsonItem={saveJsonItem}
            jsonPanelCloseHandler={() => {
              setIsJsonItemPanelShow((prevState) => !prevState);
            }}
          />
          <div className="flex-auto p-1 bg-slate-800 rounded-lg flex flex-wrap">
            <div className="flex-1">
              <MonacoEditor
                getEditorValue={(val) => {
                  editorRef.current = val;
                }}
              />
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

export default Generator;
