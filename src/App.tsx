import React from "react";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Main Content</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}

export default App;
