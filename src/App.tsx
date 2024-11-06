import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./views/Sidebar/Sidebar";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Home from "./views/Home/Home";

function App() {
  const [count, setCount] = useState(0);

  return ( 
    <Router>

    <main
      className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:slate-900 w-screen h-screen
  dark [--scroll-mt:9.875rem] js-focus-visible text-md flex gap-1"
    >
      <Sidebar className="flex-none" />
      <section className="app-section flex-1 flex">
        <div className="w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </section>
    </main>
    </Router>
  );
}

export default App;
