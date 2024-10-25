import styles from "./task-list.module.css";

const TaskList = () => {
  return (
    <div className="container text-center">
      <button className="btn btn-danger">click me</button>
      <div className="card bg-dark col-3">
        <p>task one</p>
      </div>
    </div>
  );
};

export default TaskList;
