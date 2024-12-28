import React from "react";
import { Link } from "react-router-dom";
import ToolTile from "../../components/shared/ToolTile";

const JsonTools = () => {
  return (
    <div className="h-full">
      <h2 className="text-3xl font-extrabold tracking-tight">JSON tools</h2>
      <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <div className="grid grid-cols-4 gap-2">
          <ToolTile title="JSON box" link="json-box" />
          <ToolTile title="Mock json" link="mock-json" />
        </div>
      </div>
    </div>
  );
};

export default JsonTools;
