import { toast } from "react-toastify";
import { Generators } from "../constants/json-tools";

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const copyToClipboard = async (previewCode: string) => {
  try {
    if (!window.navigator) throw Error("fail to copy to clipboard");
    await window.navigator.clipboard.writeText(previewCode);
    toast.success("successfully copied", {
      autoClose: 500,
      theme: "colored",
    });
  } catch (er) {
    toast.error(er.message, {
      autoClose: 1000,
      theme: "colored",
    });
  }
};

export const handleFileSave = async (content: string, fileType: string) => {
  try {
    const fileName = "output";
    // const handle = await window.showDirectoryPicker();
    // const fileHandle = await handle.getFileHandle(fileName, { create: true });

    // const writeable = await fileHandle.createWritable();
    // await writeable.write(previewCode);
    // await writeable.close();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName + "." + fileType;
    anchor.click();

    URL.revokeObjectURL(url);
    toast.success("Successfully downloaded file", {
      autoClose: 1000,
      theme: "colored",
    });
  } catch (er) {
    toast.error(er.message, { autoClose: 1000, theme: "colored" });
  }
};
