import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import RoleEligibility from "./pages/RoleEligibility";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources/:id" element={<RoleEligibility />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
