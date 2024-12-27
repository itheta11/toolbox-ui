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
import "react-toastify/dist/ReactToastify.css";
import MockApi from "./views/MockApi/MockApi";
import CssTools from "./views/CssTools/CssTools";
import ColorTools from "./views/CssTools/ColorTools/ColorTools";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <main
        className="antialiased bg-slate-900 text-white w-screen h-screen
  dark [--scroll-mt:9.875rem] js-focus-visible text-md flex gap-1 overflow-auto"
      >
        <Sidebar className="flex-none p-2" />
        <section className="app-section flex-1 flex p-2">
          <div className="w-full flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/json-tools" element={<JsonTools />} />
              <Route path="/json-tools/json-box" element={<JsonBox />} />
              <Route path="/json-tools/mock-json" element={<MockApi />} />

              <Route path="css-tools" element={<CssTools />} />
              <Route path="css-tools/colors" element={<ColorTools />} />
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
