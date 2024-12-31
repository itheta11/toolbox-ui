import { Editor } from "@monaco-editor/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { debounce, delay } from "lodash";

interface EditorProps {
  intialValue: string;
}

const MonacoEditor = forwardRef((props: EditorProps, ref) => {
  const [editorCode, setEditorCode] = useState(props.intialValue);
  const editorRef = useRef(null);

  useEffect(() => {
    setEditorCode(props.intialValue);
  }, [props.intialValue]);

  useImperativeHandle(ref, () => ({
    getEditorState: () => editorCode,
  }));
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };
  const handleEditorChange = (value: string | undefined) => {
    setEditorCode(value ?? "");
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
});

export default MonacoEditor;
