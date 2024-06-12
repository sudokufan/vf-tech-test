import React from "react";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <h1>Main Content</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}

export default App;
