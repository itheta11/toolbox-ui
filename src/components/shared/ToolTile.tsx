import { Link } from "react-router-dom";

const ToolTile = ({ title, link }: { title: string; link: string }) => {
  return (
    <div className="flex justify-center item-center w-[150px] h-[100px] p-4 rounded-lg bg-slate-800 text-white border-1 border-slate-500">
      <Link to={link}> {title}</Link>
    </div>
  );
};

export default ToolTile;
