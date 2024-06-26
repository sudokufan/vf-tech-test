import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ResourceFrame from "./pages/ResourceFrame";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources/:id/*" element={<ResourceFrame />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
