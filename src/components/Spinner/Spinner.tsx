import { createPortal } from "react-dom";
import { Spinner as Loader } from "@nextui-org/react";

const Spinner: React.FC<{ isShow: boolean }> = ({ isShow }) => {
  if (!isShow) return null;

  const loaderRoot = document.getElementById("loader");
  return createPortal(
    <div className=" fixed top-0 left-0 w-full h-full bg-[#00000080] z-[9999] flex justify-center items-center pointer-events-auto">
      <div className=" text-center text-white">
        <Loader color="primary" size="lg" labelColor="primary" />
      </div>
    </div>,
    loaderRoot
  );
};

export default Spinner;
