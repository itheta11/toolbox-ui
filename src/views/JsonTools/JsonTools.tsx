import React from "react";
import { Link } from "react-router-dom";
import ToolTile from "../../components/shared/ToolTile";
import { FaTools } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { FaFileExport } from "react-icons/fa6";
import { MdDifference } from "react-icons/md";

const JsonTools = () => {
  return (
    <div className="h-full">
      <h2 className="text-3xl font-extrabold tracking-tight">JSON tools</h2>
      <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <div className=" grid grid-cols-3 gap-6">
          <ToolTile
            title="Json Viewer"
            headerIcon={<FaTools />}
            link="json-box"
          >
            <p>Json validation, viewer, format, beautifier , minifier</p>
          </ToolTile>
          <ToolTile title="Mock json" headerIcon={<TbApi />} link="mock-json">
            <p> Mock api response </p>
          </ToolTile>
          <ToolTile
            title="Generator"
            headerIcon={<FaFileExport />}
            link="generator"
          >
            <p>Types, C#, XML , CSV</p>
          </ToolTile>

          <ToolTile
            title="Json Difference"
            headerIcon={<MdDifference />}
            link="mock-json"
          >
            <p>Json diff viewer , size analyzer </p>
          </ToolTile>
        </div>
      </div>
    </div>
  );
};

export default JsonTools;
