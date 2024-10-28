import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editState } from "../../Redux/taskSlice";
import TaskForm from "../task-form/task-form";
import style from "./task-list.module.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";

const KanbanBoard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [addFormVisibility, setAddFormVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [toggleButton, setToggleButton] = useState(false);
  const toast = useRef(null);

  const handleStateChange = (taskId, newState) => {
    dispatch(editState({ id: taskId, updatedState: newState }));
  };

  const confirmDeleteTask = (id) => {
    confirmDialog({
      message: "Are you sure you want to delete this task?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => handleDeleteTask(id),
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelled",
          detail: "Task deletion cancelled",
          life: 2000,
        });
      },
    });
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Task deleted successfully",
      life: 2000,
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearchQuery = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;
    return matchesSearchQuery && matchesPriority;
  });

  const columns = [
    { id: "todo", title: "To Do" },
    {
      id: "doing",
      title: "Doing",
    },
    { id: "done", title: "Done" },
  ];

  return (
    <div className={`${style.main} container-fluid`}>
      <Toast ref={toast} /> <ConfirmDialog />
      <img
        src="pexels-startup-stock-photos-7376.jpg"
        alt="background"
        className={`${style.backGroundImg} w-100 position-fixed top-0 start-0`}
      />
      <div className="container">
        <div className=" p-3">
          <div
            className={`d-block position-absolute col-lg-6 col-md-12 col-sm-12 ${style.addtask}`}
          >
            <TaskForm
              toggleButton={toggleButton}
              existingTask={selectedTask}
              formVisibility={addFormVisibility}
            />
          </div>
        </div>

        <div
          className={`${style.navBar} container-fulid position-fixed w-100 start-0 top-0`}
        >
          <div className=" w-100 p-3 d-flex justify-content-between gap-2 ">
            <h1 className="fs-3 fw-bold">Task Management</h1>

            <div className="col-4 d-flex gap-1">
              <div className="col-6">
                <input
                  type="text"
                  placeholder="Search by task name..."
                  className="form-control mb-2 col-6 bg-black text-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="col-6">
                <select
                  className="form-select col-6 bg-black text-secondary"
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

            <div className=" ">
              <p className="fw-bold">Hello, Mohamed</p>
            </div>
          </div>
        </div>

        <div className="row position-relative mt-5">
          {columns.map((column) => (
            <div className="col-md-4 mt-5" key={column.id}>
              <div
                className={`rounded ${style.column} mb-2 bg-black shadow-lg`}
              >
                <h6
                  className={` w-100 px-4 py-2 text-light fw-bold `}
                  role="button"
                >
                  {column.title}
                </h6>

                <div className={`${style.cCard}`}>
                  {filteredTasks
                    .filter((task) => task.state === column.id)
                    .map((task) => (
                      <div
                        role="button"
                        className={`${style.tCard} card m-2 bg-dark text-secondary shadow-sm `}
                        key={task.id}
                      >
                        <div className="card-body position-relative">
                          <div onClick={() => setTaskDetails(task)}>
                            <h5 className="card-title">{task.title}</h5>
                            <p
                              className="card-text"
                              style={{
                                textWrap: "nowrap",
                                textOverflow: "ellipsis",
                                whiteSpace: "",
                              }}
                            >
                              {task.description}
                            </p>
                            <p className="card-text">
                              <small>Priority: {task.priority}</small>
                            </p>
                          </div>

                          <div className=" d-flex justify-content-between gap-2">
                            <button
                              title="edit"
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => {
                                setToggleButton(!toggleButton);
                                setAddFormVisibility(true);
                                setSelectedTask(task);
                              }}
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              title="delete"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => confirmDeleteTask(task.id)}
                            >
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                            <select
                              role="button"
                              className={`form-select form-select-sm bg-dark text-secondary ${
                                task.state === "todo"
                                  ? "border "
                                  : task.state === "doing"
                                  ? "border-warning "
                                  : "border-success "
                              }`}
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
                <button
                  onClick={() => {
                    setSelectedTask(null);
                    setAddFormVisibility(true);
                    setToggleButton(!toggleButton);
                  }}
                  className={`${style.addTask} btn btn-dark rounded w-100 text-light position-relative`}
                >
                  <i class="fa-solid fa-plus"></i>
                  &nbsp; Add a task
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* task details model */}
        <Dialog
          header={taskDetails?.title || "Task Details"}
          visible={!!taskDetails}
          style={{ width: "50vw" }}
          onHide={() => setTaskDetails(null)}
        >
          {taskDetails && (
            <>
              <h5 className="modal-title">{taskDetails.title}</h5>
              <p style={{ overflow: "scroll" }}>
                <strong>Description:</strong> {taskDetails.description}
              </p>
              <p>
                <strong>Priority:</strong> {taskDetails.priority}
              </p>
              <p>
                <strong>State:</strong> {taskDetails.state}
              </p>
            </>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default KanbanBoard;
