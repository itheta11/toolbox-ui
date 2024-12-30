import { FaCopy } from "react-icons/fa";
import { copyToClipboard, handleFileSave } from "../../helpers";
import { IoMdDownload } from "react-icons/io";
import { Essentials, Generators } from "../../constants/json-tools";
import JsonViewer from "./JsonViewer";

const PreviewCode: React.FC<{ previewCode: string; converterType: string }> = ({
  previewCode,
  converterType,
}) => {
  console.log("preview code ");

  const fileSave = async () => {
    let fileType = "js";
    if (converterType === Generators.CSHARP) {
      fileType = "cs";
    } else if (converterType === Generators.CSV) {
      fileType = "csv";
    } else if (converterType === Generators.XML) {
      fileType = "xml";
    }

    await handleFileSave(previewCode, fileType);
  };
  return (
    <div className="bg-neutral-800 flex-1 flex flex-col">
      <div className=" p-2 bg-slate-700 rounded-t-md text-slate-100 flex">
        <span>Output</span>
        <div className="ml-auto flex gap-2">
          <button
            className=" flex items-center py-1 px-2 "
            onClick={async () => await copyToClipboard(previewCode)}
          >
            <FaCopy className="text-lg" />
          </button>
          <button className=" flex items-center py-1 px-2" onClick={fileSave}>
            <IoMdDownload className="text-lg" />
          </button>
        </div>
      </div>
      <pre className="whitespace-pre-wrap overflow-auto text-sm">
        {converterType === Essentials.VIEWER ? (
          <JsonViewer data={previewCode} />
        ) : (
          previewCode
        )}
      </pre>
    </div>
  );
};

export default PreviewCode;
