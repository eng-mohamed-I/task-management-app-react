import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask } from "../../Redux/taskSlice";
import TaskForm from "../task-form/task-form";
import style from "./task-list.module.css";

const KanbanBoard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [addFormVisibility, setAddFormVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const handleStateChange = (taskId, newState) => {
    dispatch(editTask({ id: taskId, updatedState: newState }));
  };

  const toggleFormVisibility = () => {
    setAddFormVisibility(!addFormVisibility);
  };

  // Filter tasks based on search query and priority
  const filteredTasks = tasks.filter((task) => {
    const matchesSearchQuery = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;
    return matchesSearchQuery && matchesPriority;
  });

  const columns = [
    { id: "todo", title: "To Do", color: "bg-light", textColor: "text-dark" },
    {
      id: "doing",
      title: "In Progress",
      color: "bg-warning",
      textColor: "text-dark",
    },
    { id: "done", title: "Done", color: "bg-success", textColor: "text-white" },
  ];

  return (
    <div className={`${style.main} container-fluid`}>
      <img
        src="pexels-startup-stock-photos-7376.jpg"
        alt="background"
        className={`${style.backGroundImg} w-100 position-fixed top-0 start-0`}
      />
      <div className="container">
        <div className="position-relative p-3">
          <button
            onClick={toggleFormVisibility}
            className="btn-success btn position-relative"
          >
            New Task
          </button>

          <div
            className={`position-absolute col-lg-12 col-md-8 col-sm-10 ${style.addtask}`}
          >
            <TaskForm formVisibilty={addFormVisibility} />
          </div>
        </div>

        <div className="container">
          <div className="position-relative p-3 ">
            <div className="col-6">
              <input
                type="text"
                placeholder="Search by task name..."
                className="form-control mb-2 col-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="col-6">
              <select
                className="form-select col-6"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row position-relative mt-4">
          {columns.map((column) => (
            <div className="col-md-4 mb-4" key={column.id}>
              <div
                className={`p-3 ${column.color} rounded ${style.column} ${style.cCard} shadow-lg`}
              >
                <h2 className={`text-center ${column.textColor}`}>
                  {column.title}
                </h2>
                {filteredTasks
                  .filter((task) => task.state === column.id)
                  .map((task) => (
                    <div className="card mb-3" key={task.id}>
                      <div className="card-body">
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.description}</p>
                        <p className="card-text">
                          <small>Priority: {task.priority}</small>
                        </p>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => dispatch(deleteTask(task.id))}
                          >
                            Delete
                          </button>
                          <select
                            className="form-select form-select-sm"
                            value={task.state}
                            onChange={(e) =>
                              handleStateChange(task.id, e.target.value)
                            }
                          >
                            <option value="todo">To Do</option>
                            <option value="doing">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
