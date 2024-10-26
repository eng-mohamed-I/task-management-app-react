import React from "react";
import style from "./task-form.module.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addTask } from "../../Redux/taskSlice";
import { taskSchema } from "../../Validators/validationSchema";

const TaskForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  const onSubmit = (data) => {
    const newTask = { id: Date.now(), ...data };
    dispatch(addTask(newTask));
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card p-4 shadow-lg bg-light d-flex flex-column gap-2 col-6"
      >
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
            <small className="text-danger">{errors.description.message}</small>
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
          <input className="form-control" type="file" {...register("image")} />
          {errors.image && (
            <small className="text-danger"> {errors.image.message}</small>
          )}
        </div>

        <div>
          <button className="btn btn-sm btn-success" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
