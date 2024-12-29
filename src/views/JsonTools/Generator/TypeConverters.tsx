import React, { useState } from "react";
import { Essentials, Generators } from "../../../constants/json-tools";
import { jsonValidator } from "../../../helpers/json/json-helpers";
import { toast } from "react-toastify";
import JsDocGenerator from "../../../helpers/json/generators/json-jsdoc";
import { GiBinoculars, GiLadder, GiRopeCoil } from "react-icons/gi";
import { FaJsSquare } from "react-icons/fa";
import { PiFileCSharpBold } from "react-icons/pi";
import { AiFillEye, AiFillCheckCircle } from "react-icons/ai";
import { FaFileCsv } from "react-icons/fa";
import { TbFileTypeXml } from "react-icons/tb";
import CsharpClassGenerator from "../../../helpers/json/generators/json-csharp";
import CsvGenerator from "../../../helpers/json/generators/json-csv";
import XmlGenerator from "../../../helpers/json/generators/json-xml";
import { Button } from "@nextui-org/react";

interface Props extends React.HTMLProps<HTMLElement> {
  className: string;
  getEditorCode: () => string;
  setPreviewCodeFromEditor: (preview: string) => void;
  getConverterType: (type: string) => void;
  saveJsonItem: () => void;
}

const TypeConverters = (props: Props) => {
  const [currConverter, setCurrConverter] = useState(null);

  /**
   *
   * convert - yaml, sql
   *
   *
   *
   * @param {Generators} generatorType
   */
  const generatorHandler = (generatorType: Generators) => {
    const editorCode = props.getEditorCode();
    props.getConverterType(generatorType);
    setCurrConverter(generatorType);
    let previewCode = "";
    if (editorCode) {
      try {
        const getObj = JSON.parse(editorCode);
        if (generatorType === Generators.JSDOC) {
          debugger;
          const jsDocGen = new JsDocGenerator();
          jsDocGen.createRoot(getObj, "root");
          previewCode = jsDocGen.toString();
        }

        if (generatorType === Generators.CSHARP) {
          const jsDocGen = new CsharpClassGenerator();
          jsDocGen.createRoot(getObj, "Root");
          previewCode = jsDocGen.toString();
        }

        if (generatorType === Generators.CSV) {
          if (!Array.isArray(getObj)) {
            throw Error("Json is not an array");
          }
          const csv = CsvGenerator.generate(getObj);
          previewCode = csv.toString();
        }

        if (generatorType === Generators.XML) {
          const xmlGen = new XmlGenerator();
          previewCode = xmlGen.create(getObj);
        }
      } catch (er) {
        previewCode = er.message;
        toast.error(er.message, {
          autoClose: 1000,
          theme: "colored",
        });
      }
    }

    props.setPreviewCodeFromEditor(previewCode);
  };

  return (
    <div
      className={
        props.className +
        " my-2 p-1 bg-slate-900 rounded-sm flex justify-content"
      }
    >
      <div className="flex-1">
        <div className="flex gap-1">
          <div className="text-blue-800 text-xl">
            <Button
              className=""
              size="sm"
              variant="solid"
              color="secondary"
              title={Generators.JSDOC}
              onClick={props.saveJsonItem}
            >
              Save
            </Button>
          </div>
          <div className="text-blue-800 text-xl">
            <Button
              className=""
              size="sm"
              variant={currConverter === Generators.JSDOC ? "solid" : "ghost"}
              color={currConverter === Generators.JSDOC ? "primary" : "default"}
              title={Generators.JSDOC}
              onClick={() => generatorHandler(Generators.JSDOC)}
            >
              <FaJsSquare className="text-2xl" />
              <span className=" lowercase">{Generators.JSDOC}</span>
            </Button>
          </div>
          <div className="text-blue-800 text-xl">
            <Button
              className=""
              size="sm"
              variant={currConverter === Generators.CSHARP ? "solid" : "ghost"}
              color={
                currConverter === Generators.CSHARP ? "primary" : "default"
              }
              title={Generators.CSHARP}
              onClick={() => generatorHandler(Generators.CSHARP)}
            >
              <PiFileCSharpBold className="text-2xl" />
              <span className=" lowercase">{Generators.CSHARP}</span>
            </Button>
          </div>
          <div className="text-blue-800 text-xl">
            <Button
              className=""
              size="sm"
              variant={currConverter === Generators.CSV ? "solid" : "ghost"}
              color={currConverter === Generators.CSV ? "primary" : "default"}
              title={Generators.CSV}
              onClick={() => generatorHandler(Generators.CSV)}
            >
              <FaFileCsv className="text-2xl" />
              <span className=" lowercase">{Generators.CSV}</span>
            </Button>
          </div>
          <div className="text-blue-800 text-xl">
            <Button
              className=""
              size="sm"
              variant={currConverter === Generators.XML ? "solid" : "ghost"}
              color={currConverter === Generators.XML ? "primary" : "default"}
              title={Generators.XML}
              onClick={() => generatorHandler(Generators.XML)}
            >
              <TbFileTypeXml className="text-2xl" />
              <span className=" lowercase">{Generators.XML}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeConverters;