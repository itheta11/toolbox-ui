import { useRef } from "react";
import Whiteboard from "../../components/Whiteboard/Whiteboard";
import { Button } from "@nextui-org/react";
import { exportToClipboard } from "@excalidraw/excalidraw";
import {
  ExcalidrawInitialDataState,
  ExportOpts,
} from "@excalidraw/excalidraw/types/types";

const intialValue: ExcalidrawInitialDataState = {
  type: "excalidraw/clipboard",
  elements: [
    {
      type: "rectangle",
      version: 123,
      versionNonce: 1885167768,
      isDeleted: false,
      id: "f0p1jSMwwzgwJj4IO2WR5",
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      angle: 0,
      x: 312.48793029785156,
      y: 222.81971740722656,
      strokeColor: "#1971c2",
      backgroundColor: "#ffec99",
      width: 423.076904296875,
      height: 202.30770874023438,
      seed: 1060319720,
      groupIds: [],
      frameId: null,
      roundness: null,
      boundElements: [],
      updated: 1735764974659,
      link: null,
      locked: false,
    },
    {
      type: "freedraw",
      version: 3,
      versionNonce: 898697112,
      isDeleted: false,
      id: "NOxInnDZSkvowH63DB-qi",
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      angle: 0,
      x: 423.25721740722656,
      y: 292.0504913330078,
      strokeColor: "#1971c2",
      backgroundColor: "#ffec99",
      width: 0.0001,
      height: 0.0001,
      seed: 1812314088,
      groupIds: [],
      frameId: null,
      roundness: null,
      boundElements: [],
      updated: 1735764978317,
      link: null,
      locked: false,
      points: [
        [0, 0],
        [0.0001, 0.0001],
      ],
      lastCommittedPoint: null,
      simulatePressure: true,
      pressures: [],
    },
    {
      type: "text",
      version: 16,
      versionNonce: 1085547672,
      isDeleted: false,
      id: "nJ0CXNO56AoDztJamyw1l",
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      angle: 0,
      x: 456.33412170410156,
      y: 294.35813903808594,
      strokeColor: "#1971c2",
      backgroundColor: "#ffec99",
      width: 260.701171875,
      height: 41.4,
      seed: 231923944,
      groupIds: [],
      frameId: null,
      roundness: null,
      boundElements: [],
      updated: 1735764992320,
      link: null,
      locked: false,
      fontSize: 36,
      fontFamily: 2,
      text: "ANUP MAHATO",
      textAlign: "left",
      verticalAlign: "top",
      containerId: null,
      originalText: "ANUP MAHATO",
      lineHeight: 1.15 as number & { _brand: "unitlessLineHeight" },
      baseline: 32,
    },
  ],
  appState: { viewBackgroundColor: "#0f172a" },
  scrollToContent: true,
  files: {},
};

export default function Drawing() {
  const whiteBoardRef = useRef(null);

  const onClick = (val) => {
    console.log("ecali state", whiteBoardRef.current.getCurrentValue());
    const options = {
      ...whiteBoardRef.current.getCurrentValue(),
    } as ExportOpts;
    const clipBoardOptions = { type: "json", ...options };

    /*@ts-ignore*/
    exportToClipboard(clipBoardOptions)
      .then(() => {
        navigator.clipboard.readText().then((text) => {
          console.log("saved in clipboard", text);
        });
      })
      .catch((er) => {
        console.error(er);
      });
  };
  return (
    <div className="h-full">
      <h2 className="text-3xl font-extrabold tracking-tight">Drawing</h2>
      <div className="h-[calc(100vh-100px)] w-full flex flex-col justify-start items-start">
        <Button onClick={onClick}> get state</Button>
        <Whiteboard intialValue={intialValue} ref={whiteBoardRef} />
      </div>
    </div>
  );
}
