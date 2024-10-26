import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask } from "../../Redux/taskSlice";
import TaskForm from "../task-form/task-form";
import style from "./task-list.module.css";

const KanbanBoard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const handleStateChange = (taskId, newState) => {
    dispatch(editTask({ id: taskId, state: newState }));
  };
  const [addFormVisibilty, setAddFormVisibilty] = useState(false);
  const showHiddenForm = () => {
    addFormVisibilty ? setAddFormVisibilty(false) : setAddFormVisibilty(true);
  };

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
    <div className={`${style.main} container-fulid`}>
      <img
        src="pexels-startup-stock-photos-7376.jpg"
        alt=""
        className="w-100 position-fixed top-0 start-0"
      />
      <div className={` container`}>
        <div className="position-relative">
          <button
            onClick={() => showHiddenForm()}
            className="btn-success btn m-3 position-relative"
          >
            new task
          </button>
          {addFormVisibilty && (
            <div
              className={`position-absolute col-lg-12 col-md-8 col-sm-8 ${style.addtask}`}
            >
              <TaskForm />
            </div>
          )}
        </div>

        <div className="row position-relative mt-4">
          {columns.map((column) => (
            <div className="col-md-4 mb-4" key={column.id}>
              <div
                className={`p-3 ${column.color} rounded ${style.column} shadow-lg`}
              >
                <h2 className={`text-center ${column.textColor}`}>
                  {column.title}
                </h2>
                {tasks
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
