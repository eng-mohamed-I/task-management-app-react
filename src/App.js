import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./Pages/task-list/task-list";
import TaskForm from "./Pages/task-form/task-form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
