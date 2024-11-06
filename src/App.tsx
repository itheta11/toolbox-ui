import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./views/Sidebar/Sidebar";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Home from "./views/Home/Home";
import JsonTools from "./views/JsonTools/JsonTools";
import JsonBox from "./views/JsonTools/JsonBox/JsonBox";
import { ToastContainer } from "react-toastify";

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
              <Route path="/json-tools" element={<JsonTools />} />
              <Route path="/json-tools/json-box" element={<JsonBox />} />
            </Routes>
          </div>
        </section>
        <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      </main>
    </Router>
  );
}

export default App;
