import { Editor } from "@monaco-editor/react";
import { debounce } from "lodash";
import { useState, useRef } from "react";

import JsonConverter from "./Coverters";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import SavedItems from "../../../components/shared/SavedItems";
import MonacoEditor from "../../../components/Editor/MonacoEditor";
import PreviewCode from "../../../components/Editor/PreviewCode";

const JsonBox = () => {
  const editorRef = useRef(null);
  const converter = useRef(null);
  const getConverterType = (converterType: string) => {
    converter.current = converterType;
  };

  const [previewCode, setPreviewCode] = useState("");
  return (
    <div className="json-box">
      <div className="flex items-center">
        <Link to="../json-tools" className="text-2xl hover:scale-110">
          <MdKeyboardArrowLeft />
        </Link>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-200">
          Json validator
        </h2>
      </div>

      <div className="h-[calc(100vh-50px)] flex items-center">
        <SavedItems isShow={false} selectNewItem={() => {}} />
        <div className="h-full flex-1 flex flex-col">
          <JsonConverter
            className="flex-auto p-2 flex gap-2"
            getConverterType={getConverterType}
            getEditorCode={() => editorRef.current}
            setPreviewCodeFromEditor={(preview) => setPreviewCode(preview)}
          />
          <div className="flex-auto p-1 bg-slate-900 rounded-lg flex flex-wrap">
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

export default JsonBox;
