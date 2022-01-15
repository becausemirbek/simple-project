import { useState } from "react";

import List from "../../components/List/List";
import { TaskModel } from "../../models/TaskModel";
import "./TasksPage.scss";

const TASKS = [
  {
    id: 1,
    name: "loundry",
    done: false,
  },
  {
    id: 2,
    name: "this program",
    done: false,
  },
  {
    id: 3,
    name: "FrasierApp",
    done: false,
  },
  {
    id: 4,
    name: "done one",
    done: true,
  },
  {
    id: 5,
    name: "learn Redux",
    done: false,
  },
  {
    id: 6,
    name: "cook dinner",
    done: true,
  },
];

function TasksPage() {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [tasks, setTasks] = useState<TaskModel[]>(TASKS);

  const addTask = (): void => {
    if (!taskTitle.trim().length) return alert("fill");
    let newTask = { id: Date.now(), name: taskTitle, done: false };
    let updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTaskTitle("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskTitle(event.target.value);
  };

  return (
    <div className="tasks">
      <input
        type="text"
        className="task-input"
        value={taskTitle}
        placeholder="Add..."
        onChange={onChange}
      />
      <button className="btn add-button" onClick={() => addTask()}>
        Add
      </button>
      <List tasks={tasks} />
    </div>
  );
}

export default TasksPage;
