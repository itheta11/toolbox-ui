import { Editor } from "@monaco-editor/react";
import { debounce } from "lodash";
import { useState, useRef } from "react";

import JsonConverter from "./Coverters";

const JsonBox = () => {
  const [editorCode, setEditorCode] = useState("");
  const editorRef = useRef(null);

  const [previewCode, setPreviewCode] = useState("");
  const previewCodeRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    setEditorCode(value ?? "");
  };
  const debounce_handleEditorChange = debounce(handleEditorChange, 1000);
  return (
    <div className="json-box">
      <h2 className="text-xl font-extrabold tracking-tight text-slate-200">
        Json validator
      </h2>
      <div className="h-[calc(100vh-50px)] flex flex-col">
        <JsonConverter
          className="flex-auto h-24 p-2 flex gap-2"
          getEditorCode={() => editorCode}
          setPreviewCodeFromEditor={(preview) => setPreviewCode(preview)}
        />
        <div className="flex-auto p-1 bg-slate-700 rounded-lg flex flex-wrap">
          <div className="flex-1">
            <Editor
              theme="vs-dark"
              defaultLanguage="json"
              value={editorCode}
              onMount={handleEditorDidMount}
              onChange={(e) => debounce_handleEditorChange(e)}
            />
          </div>
          <div className="flex-1 flex flex-col p-2">
            <h3>Output</h3>
            <pre className="whitespace-pre-wrap overflow-auto">
              {previewCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonBox;
