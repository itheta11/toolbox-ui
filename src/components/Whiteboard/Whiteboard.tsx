import {
  Excalidraw,
  exportToClipboard,
  exportToCanvas,
} from "@excalidraw/excalidraw";
import {
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/excalidraw/types/element/types";
import {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types";
import { forwardRef, useImperativeHandle, useState } from "react";

interface WhiteboardProps {
  intialValue?: ExcalidrawInitialDataState;
}

interface WhiteboardRefs {
  getCurrentValue: () => any;
}

const Whiteboard = forwardRef<WhiteboardRefs, WhiteboardProps>(
  ({ intialValue }, ref) => {
    const [excalidrawApi, setExcalidrawApi] =
      useState<ExcalidrawImperativeAPI>(null);

    useImperativeHandle(ref, () => ({
      getCurrentValue: () => {
        return {
          elements: excalidrawApi.getSceneElements(),
          appState: {
            ...excalidrawApi.getAppState(),
            exportWithDarkMode: true,
          },
          files: excalidrawApi.getFiles(),
          dimensions: {
            width: 350,
            height: 350,
          },
        };
      },
    }));

    return (
      <div className=" w-full h-full bg-slate-700 flex flex-col p-2 rounded-sm">
        <Excalidraw
          initialData={intialValue}
          excalidrawAPI={(api) => setExcalidrawApi(api)}
        />
      </div>
    );
  }
);

export default Whiteboard;
