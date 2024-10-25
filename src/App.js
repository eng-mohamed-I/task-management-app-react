import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./Pages/task-list/task-list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
