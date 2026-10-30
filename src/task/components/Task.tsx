import { useContext, useEffect, useState } from "react";
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
  refreshList,
}: {
  taskName: string;
  taskDescription: string;
  taskDueDate: any;
  taskStatus: boolean;
  taskIndex: number;
  refreshList: Function;
}) => {
  const { taskListState, snackbarMessageState, snackbarOpenState } =
    useContext(TaskContext);
  const [taskList, setTaskList] = taskListState;
  const [_snackbarMessage, setSnackbarMessage] = snackbarMessageState;
  const [_snackbarOpen, setSnackbarOpen] = snackbarOpenState;
  const [checked, setChecked] = useState(taskStatus);

  useEffect(() => {
    setChecked(taskStatus);
  });

  /**
   * Handles checkbox change event
   * @param event ChangeEvent emitted when checkbox is checked/unchecked
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setChecked(event.target.checked);
      const taskListCopy = taskList;
      taskListCopy[taskIndex].completed = event.target.checked;
      taskListCopy.sort(
        (a: TaskInfo, b: TaskInfo) => Number(a.completed) - Number(b.completed),
      );
      localStorage.setItem("taskList", JSON.stringify(taskListCopy));
      setTaskList(taskListCopy);
      refreshList();
    } catch (error) {
      const message = `Error when updating task status: ${error}`;
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }
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
