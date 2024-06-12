import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <button id="fetchButton" onClick={functionCall}>
        Fetch Resources
      </button>
      <pre id="result"></pre>
    </div>
  );
}

export default App;
