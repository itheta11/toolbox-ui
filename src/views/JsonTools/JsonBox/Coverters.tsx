import React from "react";
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
import { TbShieldCheckFilled } from "react-icons/tb";
import { PiTreeViewFill } from "react-icons/pi";
import { SiPrettier } from "react-icons/si";
import { MdOutlineCompress } from "react-icons/md";

import CsharpClassGenerator from "../../../helpers/json/generators/json-csharp";
import CsvGenerator from "../../../helpers/json/generators/json-csv";
import XmlGenerator from "../../../helpers/json/generators/json-xml";
import { Button } from "@nextui-org/react";

interface Props extends React.HTMLProps<HTMLElement> {
  className: string;
  getEditorCode: () => string;
  setPreviewCodeFromEditor: (preview: string) => void;
}

const JsonConverter = (props: Props) => {
  const essentialHandler = (esssentailsType: Essentials) => {
    const editorCode = props.getEditorCode();
    let previewCode = "";
    if (editorCode) {
      try {
        if (esssentailsType === Essentials.VALIDATOR) {
          previewCode = validateJson(editorCode);
        }

        if (esssentailsType === Essentials.BEAUTIFY) {
          previewCode = beautifyJson(editorCode, 4);
        }

        if (esssentailsType === Essentials.MINIFY) {
          previewCode = minifyJson(editorCode);
        }
      } catch (er: any) {
        previewCode = er.messagge;
        toast.error(er.messagge, {
          autoClose: 1000,
          theme: "colored",
        });
      }
    }
    props.setPreviewCodeFromEditor(previewCode);
  };

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

  const validateJson = (val: string) => {
    try {
      jsonValidator(val);
      toast.success("This ia a valid json", {
        autoClose: 1000,
        theme: "colored",
      });
      return JSON.stringify(JSON.parse(val));
    } catch (er) {
      console.error(er);
    }
  };

  /**
   * Beautifies a JSON string with specified indentation.
   * @param {string} jsonString - The JSON string to beautify.
   * @param {number} [spaces=2] - Number of spaces for indentation (default is 2).
   * @returns {string} - The beautified JSON string.
   * @throws {Error} - If the input is not a valid JSON string.
   */
  function beautifyJson(jsonString, spaces = 2) {
    try {
      const jsonObject = JSON.parse(jsonString);
      toast.success("Prettified json", {
        autoClose: 1000,
        theme: "colored",
      });
      return JSON.stringify(jsonObject, null, spaces);
    } catch (error) {
      throw new Error("Invalid JSON string: " + error.message);
    }
  }

  /**
   * Minifies a JSON string by removing unnecessary spaces and line breaks.
   * @param {string} jsonString - The JSON string to minify.
   * @returns {string} - The minified JSON string.
   * @throws {Error} - If the input is not a valid JSON string.
   */
  function minifyJson(jsonString) {
    try {
      const jsonObject = JSON.parse(jsonString);
      toast.success("Minified json", {
        autoClose: 1000,
        theme: "colored",
      });
      return JSON.stringify(jsonObject);
    } catch (error) {
      throw new Error("Invalid JSON string: " + error.message);
    }
  }
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
              color="primary"
              title={Essentials.VALIDATOR}
              onClick={() => essentialHandler(Essentials.VALIDATOR)}
            >
              <TbShieldCheckFilled className="text-2xl" />
              <span className=" lowercase">{Essentials.VALIDATOR}</span>
            </Button>
          </div>
          <div className="text-blue-800 text-xl">
            <Button
              className=""
              size="sm"
              variant="ghost"
              title={Essentials.VALIDATOR}
              onClick={() => essentialHandler(Essentials.VIEWER)}
            >
              <PiTreeViewFill className="text-2xl" />
              <span className=" lowercase">{Essentials.VIEWER}</span>
            </Button>
          </div>
          <div className="text-blue-800 text-xl">
            <Button
              className=""
              size="sm"
              variant="ghost"
              title={Essentials.BEAUTIFY}
              onClick={() => essentialHandler(Essentials.BEAUTIFY)}
            >
              <SiPrettier className="text-2xl" />
              <span className=" lowercase">{Essentials.BEAUTIFY}</span>
            </Button>
          </div>

          <div className="text-blue-800 text-xl">
            <Button
              className=""
              size="sm"
              variant="ghost"
              title={Essentials.MINIFY}
              onClick={() => essentialHandler(Essentials.MINIFY)}
            >
              <MdOutlineCompress className="text-2xl" />
              <span className=" lowercase">{Essentials.MINIFY}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonConverter;
