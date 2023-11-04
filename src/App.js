import "./App.css";

import "./css/main.css";

import NavBar from "./components/NavBar";
import TaskSearchAndBody from "./components/TaskSearchAndBody";

function App() {
  return (
    <div className="App">
      <NavBar />

      <TaskSearchAndBody />
    </div>
  );
}

export default App;
