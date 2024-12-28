import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { VscJson } from "react-icons/vsc";
import { RiJavascriptFill } from "react-icons/ri";
import { SiDotnet } from "react-icons/si";
import { MdArticle } from "react-icons/md";
import { IoLogoCss3 } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { expandPanel, collapsePanel } from "../../store/sidePanelSlice";

interface Props extends React.HTMLProps<HTMLElement> {
  className?: string;
}

interface MainItemProps extends Props {
  to: string;
  iconClassName?: string;
  title: string;
}

const Sidebar: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state: any) => state.sidePanel.isExpanded);

  const handleMouseEnter = () => {
    dispatch(expandPanel());
  };

  const handleMouseLeave = () => {
    dispatch(collapsePanel());
  };

  return (
    <aside
      className={
        props.className +
        ` w-14 border-r-1 border-slate-600 sticky top-0 overflow-hidden transition-width ease-in-out duration-300 ${isExpanded ? "w-40" : ""}`
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="px-2 mt-2">
        <div className="flex gap-2 mb-6">
          <div
            className="w-[40px] h-[40px] bg-blue-900 px-2 text-white text-4xl font-bold flex justify-center 
          item-center rounded-md"
          >
            <AiOutlineCodeSandbox />
          </div>

          <span className="font-bold text-white">TOOLBOX</span>
        </div>
        <div className="">
          <ul className="flex flex-col gap-2">
            <NavMainItems to="json-tools" title="JSON tools">
              <VscJson className="" />
            </NavMainItems>
            <NavMainItems to="css-tools" title="CSS tools">
              <IoLogoCss3 className="group-hover:shadow-fuchsia-200 dark:group-hover:bg-fuchsia-600" />
            </NavMainItems>
            <NavMainItems to="/" title="Js tools">
              <RiJavascriptFill className="group-hover:shadow-slate-200 dark:group-hover:bg-black" />
            </NavMainItems>
            <NavMainItems to="/" title=".NET tools">
              <SiDotnet className="group-hover:shadow-fuchsia-200 dark:group-hover:bg-fuchsia-600" />
            </NavMainItems>
            <NavMainItems to="/" title="Articles">
              <MdArticle className="group-hover:shadow-fuchsia-200 dark:group-hover:bg-fuchsia-600" />
            </NavMainItems>
            <NavMainItems to="/" title="Cheatsheets">
              <VscJson className="group-hover:shadow-fuchsia-200 dark:group-hover:bg-fuchsia-600" />
            </NavMainItems>
            <NavMainItems to="/" title="Miscellaneous">
              <VscJson className="group-hover:shadow-fuchsia-200 dark:group-hover:bg-fuchsia-600" />
            </NavMainItems>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

const NavMainItems: React.FC<MainItemProps> = (props) => {
  return (
    <li className="  ">
      <Link to={props.to}>
        <div className="flex gap-2 hover:bg-slate-700 rounded-md">
          <div className="w-[40px] h-[40px] bg-slate-800 text-2xl font-bold flex rounded-md">
            <NavItemIcon>{props.children}</NavItemIcon>
          </div>
          <div className="text-sm flex justify-center items-center">
            {props.title}
          </div>
        </div>
      </Link>
    </li>
  );
};

const NavItemIcon: React.FC<Props> = (props) => {
  return <div className="p-2 rounded-md">{props.children}</div>;
};
export default Sidebar;
