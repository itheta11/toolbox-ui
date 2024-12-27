import React from "react";
import { Link } from "react-router-dom";

interface Props extends React.HTMLProps<HTMLElement> {
  className: string;
  getEditorCode: () => string;
  setPreviewCodeFromEditor: (preview: string) => void;
}

const JsonTools = () => {
  return (
    <div className="h-full">
      <h2 className="text-3xl font-extrabold tracking-tight">JSON tools</h2>
      <div className="h-[calc(100vh-100px)] bg-blue-300 w-full flex justify-center items-center">
        <div className="grid grid-cols-4 gap-2">
          <ToolTile title="JSON box" link="json-box" />
          <ToolTile title="Mock json" link="mock-json" />
        </div>
      </div>
    </div>
  );
};

const ToolTile = ({ title, link }: { title: string; link: string }) => {
  return (
    <div className="flex justify-center item-center w-[150px] h-[150px] p-4 rounded-lg bg-gray-500 text-white tooltile">
      <Link to={link}> {title}</Link>
    </div>
  );
};

export default JsonTools;
