import React from "react";
import { Essentials, Generators } from "../../../constants/json-tools";
import { jsonValidator } from "../../../helpers/json/json-helpers";
import { toast } from "react-toastify";
import JsDocGenerator from "../../../helpers/json/generators/json-jsdoc";
import { GiBinoculars, GiLadder, GiRopeCoil } from "react-icons/gi";
import { FaJsSquare } from "react-icons/fa";
import { PiFileCSharpBold } from "react-icons/pi";
import CsharpClassGenerator from "../../../helpers/json/generators/json-csharp";
import CsvGenerator from "../../../helpers/json/generators/json-csv";
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
      } catch (er: any) {
        previewCode = er.messagge;
      }
    }
    props.setPreviewCodeFromEditor(previewCode);
  };

  const generatorHandler = (generatorType: Generators) => {
    const editorCode = props.getEditorCode();
    let previewCode = "";
    if (editorCode) {
      try {
        if (generatorType === Generators.JSDOC) {
          const getObj = JSON.parse(editorCode);
          const jsDocGen = new JsDocGenerator();
          jsDocGen.create(getObj, "root");
          previewCode = jsDocGen.toString();
        }

        if (generatorType === Generators.CSHARP) {
          const getObj = JSON.parse(editorCode);
          const jsDocGen = new CsharpClassGenerator();
          jsDocGen.create(getObj, "root");
          previewCode = jsDocGen.toString();
        }

        if (generatorType === Generators.CSV) {
          console.log("fsfs")
          const csv = CsvGenerator.generate(editorCode)
          previewCode = csv.toString();
        }
      } catch (er) {
        previewCode = er.message;
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
      toast.error(er.messagge, {
        autoClose: 1000,
        theme: "colored",
      });
    }
  };
  return (
    <div
      className={
        props.className +
        " my-2 p-1 bg-slate-700 rounded-sm flex justify-content"
      }
    >
      <div className="flex-1 border-r-1 border-r-slate-400">
        <h3 className="text-slate-200 text-sm"> Essentials </h3>
        <div className="grid grid-cols-3">
          <div className="text-blue-400 text-xl">
            <button
              className="p-1 bg-slate-400 rounded-sm"
              title={Essentials.VALIDATOR}
              onClick={() => essentialHandler(Essentials.VALIDATOR)}
            >
              <GiLadder />
            </button>
          </div>
          <div className="text-blue-400 text-xl">
            <button
              className="p-1 bg-slate-400 rounded-sm"
              title={Essentials.VALIDATOR}
              onClick={() => essentialHandler(Essentials.VIEWER)}
            >
              <GiBinoculars />
            </button>
          </div>
          <div className="text-blue-400 text-xl">
            <button
              className="p-1 bg-slate-400 rounded-sm"
              title={Essentials.VALIDATOR}
            >
              <GiRopeCoil />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-[2] border-r-1 border-r-slate-400">
        <h3 className="text-slate-200 text-sm"> Generators </h3>
        <div className="grid grid-cols-5">
          <div className="text-blue-400 text-xl">
            <button
              className="p-1 bg-slate-400 rounded-sm"
              title={Generators.JSDOC}
              onClick={() => generatorHandler(Generators.JSDOC)}
            >
              <FaJsSquare />
            </button>
          </div>
          <div className="text-blue-400 text-xl">
            <button
              className="p-1 bg-slate-400 rounded-sm"
              title={Generators.CSHARP}
              onClick={() => generatorHandler(Generators.CSHARP)}
            >
              <PiFileCSharpBold />
            </button>
          </div>
          <div className="text-blue-400 text-xl">
            <button
              className="p-1 bg-slate-400 rounded-sm"
              title={Generators.CSV}
              onClick={() => generatorHandler(Generators.CSV)}
            >
              <FaJsSquare />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-slate-200">Others</h3>
      </div>
    </div>
  );
};

export default JsonConverter;
