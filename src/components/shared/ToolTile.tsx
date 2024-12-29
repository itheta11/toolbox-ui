import { Link } from "react-router-dom";
import { GiToolbox } from "react-icons/gi";
import { RiArrowRightSLine } from "react-icons/ri";

interface ToolTileProps {
  title: string;
  link: string;
  headerIcon?: JSX.Element;
  children?: JSX.Element;
}
const ToolTile: React.FC<ToolTileProps> = ({
  title,
  link,
  headerIcon,
  children,
}) => {
  return (
    <Link to={link}>
      <div
        className="group relative border border-opacity-25 border-slate-100 bg-slate-800 border-overlay flex gap-2  h-32 w-64 flex-row rounded-md p-4 
      hover:bg-overlay-hover hover:bg-slate-700 transition duration-150 ease-in-out"
      >
        <div className="flex flex-col ">
          <div className=" p-2 rounded-full bg-slate-500 text-slate-50 transition-all group-hover:scale-110">
            {headerIcon || <GiToolbox />}
          </div>
        </div>
        <div className="w-4/5 space-y-4">
          <h5 className="text-foreground mt-1 font-medium"> {title} </h5>
          <div className="text-sm text-foreground-light">{children}</div>
        </div>
        <div
          className=" absolute right-4 top-5 text-foreground-lighter transition-all duration-200 group-hover:right-3 
        group-hover:text-foreground text-2xl"
        >
          <RiArrowRightSLine />
        </div>
      </div>
    </Link>
  );
};

export default ToolTile;
