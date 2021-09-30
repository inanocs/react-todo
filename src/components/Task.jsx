import Button from "./Button";
const Task = ({ task, onCompleteTask, onDeleteTask }) => {
  const handleChange = (e) => {
    onCompleteTask(task);
  };

  const handleDelete = (e) => {
    onDeleteTask(task);
  };

  return (
    <li className={`task ${task.color}`}>
      <input
        type="checkbox"
        onChange={handleChange}
        className="task__checkbox"
        checked={task.complete}
      />
      <p
        className={`task__text ${task.complete ? "task__text--complete" : ""}`}
      >
        {task.name}
      </p>
      <Button
        color="white"
        event={handleDelete}
        styles={["task__button"]}
        text="Delete"
      />
    </li>
  );
};

export default Task;
