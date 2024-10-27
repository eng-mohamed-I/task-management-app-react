import style from "./task-form.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../../Redux/taskSlice";
import { taskSchema } from "../../Validators/validationSchema";
import { useEffect, useState } from "react";

const TaskForm = ({ formVisibility, existingTask }) => {
  const dispatch = useDispatch();
  const [addFormVisibility, setAddFormVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: existingTask
      ? {
          title: existingTask.title,
          description: existingTask.description,
          priority: existingTask.priority,
          state: existingTask.state,
        }
      : {},
  });

  const onSubmit = (data) => {
    if (existingTask) {
      // Update task
      const updatedTask = { ...existingTask, ...data };
      dispatch(editTask({ id: existingTask.id, updatedTask }));
    } else {
      // Add new task
      const newTask = { id: Date.now(), ...data };
      dispatch(addTask(newTask));
    }
    setAddFormVisibility(false);
    reset();
  };

  useEffect(() => {
    setAddFormVisibility(formVisibility);
    console.log(existingTask);
    if (formVisibility) {
      reset(
        existingTask
          ? {
              title: existingTask.title,
              description: existingTask.description,
              priority: existingTask.priority,
              state: existingTask.state,
            }
          : {}
      );
    }
  }, [formVisibility, existingTask, reset]);

  return (
    <>
      {addFormVisibility && (
        <div className={`${style.addform} container`}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card p-4 shadow-lg bg-light d-flex flex-column gap-2"
          >
            <div
              onClick={() => setAddFormVisibility(false)}
              className="btn btn-danger btn-sm"
            >
              X
            </div>
            <div className="d-flex flex-column">
              <input
                className="form-control"
                type="text"
                {...register("title")}
                placeholder="Title"
              />
              {errors.title && (
                <small className="text-danger">{errors.title.message}</small>
              )}
            </div>

            <div className="d-flex flex-column">
              <textarea
                className="form-control"
                {...register("description")}
                placeholder="Description"
              />
              {errors.description && (
                <small className="text-danger">
                  {errors.description.message}
                </small>
              )}
            </div>

            <div className="d-flex flex-column">
              <select className="form-control" {...register("priority")}>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && (
                <small className="text-danger">{errors.priority.message}</small>
              )}
            </div>

            <div className="d-flex flex-column">
              <select className="form-control" {...register("state")}>
                <option value="">Select State</option>
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
              {errors.state && (
                <small className="text-danger">{errors.state.message}</small>
              )}
            </div>

            <div className="d-flex flex-column">
              <input
                className="form-control"
                type="file"
                {...register("image")}
              />
              {errors.image && (
                <small className="text-danger"> {errors.image.message}</small>
              )}
            </div>

            <div>
              <button className="btn btn-sm btn-success" type="submit">
                {existingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default TaskForm;
