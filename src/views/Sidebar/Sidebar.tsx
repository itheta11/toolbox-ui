import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { VscJson } from "react-icons/vsc";
import { RiJavascriptFill } from "react-icons/ri";
import { SiDotnet } from "react-icons/si";
import { MdArticle } from "react-icons/md";

interface Props extends React.HTMLProps<HTMLElement> {
  className?: string;
}

interface MainItemProps extends Props {
  to: string;
  iconClassName?: string;
  title: string;
}

const Sidebar: React.FC<Props> = (props) => {
  return (
    <aside className={props.className + "w-40 border-r sticky top-0"}>
      <nav>
        <div className="flex gap-2">
          <span className="text-blue-400 text-2xl font-bold">
            <AiOutlineCodeSandbox />
          </span>

          <span className="font-bold text-white">TOOLBOX</span>
        </div>
        <div>
          <ul>
            <NavMainItems to="/js-tools" title="JSON tools">
              <VscJson className="group-hover:shadow-fuchsia-200 dark:group-hover:bg-fuchsia-600" />
            </NavMainItems>
            <NavMainItems to="/" title="JSON tools">
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
    <li>
      <Link to={props.to}>
        <div
          className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700
        hover:text-slate-900 datk:text-slate-400 dark:hover:text-slate-300"
        >
          <NavItemIcon>{props.children}</NavItemIcon>
          <div>{props.title}</div>
        </div>
      </Link>
    </li>
  );
};

const NavItemIcon: React.FC<Props> = (props) => {
  return (
    <div className="p-2 mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none darl:group-hover:shadow-none dark:group-hpver:highlight-white/10 dark:bg:slate-800 dark:highlighr-white/5">
      {props.children}
    </div>
  );
};
export default Sidebar;
