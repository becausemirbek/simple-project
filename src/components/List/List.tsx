import { useEffect, useState, DragEvent } from "react";
import { TaskModel } from "../../models/TaskModel";
import Task from "../Task/Task";
import "./List.scss";

interface TaskListProps {
  tasks: TaskModel[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const [state, setState] = useState<TaskModel[]>(tasks);
  const [pending, setPending] = useState<TaskModel[]>([]);
  const [done, setDone] = useState<TaskModel[]>([]);

  useEffect(() => {
    setState(tasks);
  }, [tasks]);

  useEffect(() => {
    setPending(state.filter((task: TaskModel) => !task.done));
    setDone(state.filter((task: TaskModel) => task.done));
  }, [state]);

  function onDragStart(evt: DragEvent<HTMLDivElement>): void {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  }
  function onDragEnd(evt: DragEvent<HTMLDivElement>): void {
    evt.currentTarget.classList.remove("dragged");
  }
  function onDragEnter(evt: DragEvent<HTMLDivElement>): void {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  }
  function onDragLeave(evt: any): void {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (
      newTarget.parentElement === currentTarget ||
      newTarget === currentTarget
    )
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  }

  function onDragOver(evt: DragEvent<HTMLDivElement>): void {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  }

  function onDrop(evt: any, value: boolean): void {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let updated = state.map((task: TaskModel) => {
      if (task.id == data) task.done = value;
      return task;
    });
    setState(updated);
  }
  return (
    <div className="task-lists">
      <div
        className="todo"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, false)}
      >
        <h3>Todo</h3>
        {pending.map((task: TaskModel) => (
          <Task
            key={task.id}
            name={task.name}
            id={task.id.toString()}
            onDragStart={(e) => onDragStart(e)}
            onDragEnd={(e) => onDragEnd(e)}
          />
        ))}
      </div>
      <div
        className="done"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, true)}
      >
        <h3>Done</h3>
        {done.map((task: TaskModel) => (
          <Task
            key={task.id}
            name={task.name}
            id={task.id.toString()}
            onDragStart={(e) => onDragStart(e)}
            onDragEnd={(e) => onDragEnd(e)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
