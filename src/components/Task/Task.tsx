import { TaskPropsModel } from "../../models/TaskPropsModel";
import "./Task.scss";

const Task = ({ name, id, onDragStart, onDragEnd }: TaskPropsModel) => {
  return (
    <div
      className="task"
      id={id}
      draggable
      onDragStart={(e) => onDragStart(e)}
      onDragEnd={(e) => onDragEnd(e)}
    >
      {name}
    </div>
  );
};

export default Task;
