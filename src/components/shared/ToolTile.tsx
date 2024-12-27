import { Link } from "react-router-dom";

const ToolTile = ({ title, link }: { title: string; link: string }) => {
  return (
    <div className="flex justify-center item-center w-[150px] h-[150px] p-4 rounded-lg bg-gray-500 text-white tooltile">
      <Link to={link}> {title}</Link>
    </div>
  );
};

export default ToolTile;
