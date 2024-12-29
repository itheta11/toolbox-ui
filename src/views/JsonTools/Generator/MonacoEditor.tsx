import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { debounce, delay } from "lodash";

interface EditorProps {
  getEditorValue: (val: string) => void;
}

const MonacoEditor: React.FC<EditorProps> = ({ getEditorValue }) => {
  const [editorCode, setEditorCode] = useState("");
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };
  const handleEditorChange = (value: string | undefined) => {
    setEditorCode(value ?? "");
    getEditorValue(value ?? "");
  };
  const debounce_handleEditorChange = debounce(handleEditorChange, 1000);

  return (
    <Editor
      theme="vs-dark"
      defaultLanguage="json"
      value={editorCode}
      onMount={handleEditorDidMount}
      onChange={(e) => debounce_handleEditorChange(e)}
    />
  );
};

export default MonacoEditor;
