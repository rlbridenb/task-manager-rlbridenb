import { useState } from "react";
import * as React from "react";
import "../TaskManager.scss";
import Checkbox from "@mui/material/Checkbox";
import TaskManagerItemMenu from "./TaskManagerItemMenu";
import { type TaskItem } from "../../types/types";

const TaskManagerItem = ({
  taskList,
  setTaskList,
  setTaskDefaults,
  setEditingTask,
  setOpen,
  setSnackbarMessage,
  setOpenSnackbar,
  taskName,
  taskDescription,
  taskDueDate,
  taskStatus,
  taskIndex,
}: {
  taskList: TaskItem[];
  setTaskList: Function;
  setTaskDefaults: Function;
  setEditingTask: Function;
  setOpen: Function;
  setSnackbarMessage: Function;
  setOpenSnackbar: Function;
  taskName: string;
  taskDescription: string;
  taskDueDate: any;
  taskStatus: boolean;
  taskIndex: number;
}) => {
  const [checked, setChecked] = useState(taskStatus);

  /**
   *  Handles checkbox change event
   * @param event ChangeEvent emitted when checkbox is checked/unchecked
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const taskListCopy = taskList;
    taskListCopy[taskIndex].completed = checked;
    // taskListCopy.sort(
    //   (a: TaskItem, b: TaskItem) => Number(b.completed) - Number(a.completed),
    // );
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
        <TaskManagerItemMenu
          taskList={taskList}
          setTaskList={setTaskList}
          setTaskDefaults={setTaskDefaults}
          setEditingTask={setEditingTask}
          setOpen={setOpen}
          setSnackbarMessage={setSnackbarMessage}
          setOpenSnackbar={setOpenSnackbar}
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
            <p className="bold">In-progress</p>
          )}
          {taskDueDate ? " • " : ""}
          <p aria-label="task-due-date">{taskDueDate}</p>
        </div>
        {taskDescription ? <p>{taskDescription}</p> : ""}
      </div>
    </div>
  );
};

export default TaskManagerItem;
