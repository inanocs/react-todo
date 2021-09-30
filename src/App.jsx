import "./App.css";
import { useState, useEffect } from "react";

// Components
import Task from "./components/Task";
import { FormTask } from "./components/FormTask";

const initialTasks = [];
function App() {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const checkLocalStorage = () => {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    };

    checkLocalStorage();
  }, []);

  const saveState = (newTasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  const createTask = (task) => {
    const taskId =
      tasks.length === 0 ? 1 : Math.max(...tasks.map((taskM) => taskM.id)) + 1;

    const newTasks = [...tasks, { ...task, id: taskId }];
    setTasks(newTasks);
    saveState(newTasks);
  };

  const handleCompleteTask = (task) => {
    const newTasks = tasks.map((newTask) =>
      newTask.id === task.id
        ? { ...newTask, complete: !task.complete }
        : newTask
    );
    setTasks(newTasks);
    saveState(newTasks);
  };
  const handleDeleteTask = (task) => {
    const newTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);
    saveState(newTasks);
  };

  return (
    <div className="App App-header">
      <FormTask onCreateTask={createTask} />
      <ul className="tasks">
        {tasks.length !== 0
          ? tasks.map((task) => (
              <Task
                onCompleteTask={handleCompleteTask}
                onDeleteTask={handleDeleteTask}
                key={task.id}
                task={task}
              />
            ))
          : null}
      </ul>
    </div>
  );
}

export default App;
