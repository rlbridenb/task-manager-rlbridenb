import { useContext, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TaskContext from "../TaskContext";
import { type TaskInfo } from "../../types/types";
import TaskMenu from "./TaskMenu";
import "../TaskManager.scss";

const Task = ({
  taskName,
  taskDescription,
  taskDueDate,
  taskStatus,
  taskIndex,
}: {
  taskName: string;
  taskDescription: string;
  taskDueDate: any;
  taskStatus: boolean;
  taskIndex: number;
}) => {
  const { taskListState } = useContext(TaskContext);
  const [taskList, setTaskList] = taskListState;
  const [checked, setChecked] = useState(taskStatus);

  /**
   * Handles checkbox change event
   * @param event ChangeEvent emitted when checkbox is checked/unchecked
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const taskListCopy = taskList;
    taskListCopy[taskIndex].completed = checked;
    taskListCopy.sort(
      (a: TaskInfo, b: TaskInfo) => Number(b.completed) - Number(a.completed),
    );
    setTaskList(taskListCopy);
  };

  return (
    <div className={checked ? "completed-task-item" : "task-item"}>
      <div className="task-item-info">
        <div className="task-item-main-info">
          <Checkbox
            id="complete-task"
            checked={checked}
            onChange={handleChange}
            aria-label="complete-task"
          />
          <p id="taskName" aria-label="task-name">
            {taskName}
          </p>
        </div>
        <TaskMenu
          taskName={taskName}
          taskDescription={taskDescription}
          taskDueDate={taskDueDate}
          taskIndex={taskIndex}
        />
      </div>
      <div className="task-item-sub-info">
        <div className="task-date-and-status">
          {checked ? (
            <p id="task-status" aria-label="task-status" className="bold">
              Completed
            </p>
          ) : (
            <p className="bold">To-do</p>
          )}
          {taskDueDate ? " • " : ""}
          <p aria-label="task-due-date">{taskDueDate}</p>
        </div>
        {taskDescription ? (
          <p className="task-description">{taskDescription}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Task;
