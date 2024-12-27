import React from "react";
import { Link } from "react-router-dom";
import ToolTile from "../../components/shared/ToolTile";

const CssTools = () => {
  return (
    <div className="h-full">
      <h2 className="text-3xl font-extrabold tracking-tight">CSS tools</h2>
      <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <div className="grid grid-cols-4 gap-2">
          <ToolTile title="Colors" link="colors" />
          <ToolTile title="Length" link="/" />
        </div>
      </div>
    </div>
  );
};

export default CssTools;
