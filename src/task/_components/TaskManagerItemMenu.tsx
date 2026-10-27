import { useState } from "react";
import * as React from "react";
import "../TaskManager.scss";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { TaskItem } from "../../types/types";
import dayjs from "dayjs";

const TaskManagerItemMenu = ({
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
  taskIndex: number;
}) => {
  /**
   * Variables/functions for handling menu behavior and dynamically defining IDs
   * From MUI docs: https://mui.com/material-ui/react-menu/#basic-menu
   */
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handles opening modal when editing a task. Populates taskDefaults with info of task
   * being edited for setting default form values in modal.
   * @param taskName name of task
   * @param taskDescription description of task
   * @param taskDueDate task due date
   * @param taskIndex index of task in taskList (used for edit/delete operations)
   */
  const handleEditOpen = (
    taskName: string,
    taskDescription: string,
    taskDueDate: any,
    taskIndex: number,
  ) => {
    // Close item menu
    handleClose();
    // Set taskDefaults to values of task being edited
    const taskInfo = {
      index: taskIndex,
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate ? dayjs(taskDueDate) : null,
    };
    setTaskDefaults(taskInfo);
    setEditingTask(true);
    setOpen(true);
  };

  /**
   * Uses index of task in taskList to delete a task
   * @param taskIndex index of task in taskList
   */
  function deleteTask(taskIndex: number) {
    let message = "";
    const taskListCopy = taskList;
    try {
      taskListCopy.splice(taskIndex, 1);
      setTaskList(taskListCopy);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      message = "Task deleted";
    } catch (error) {
      message = `Error deleting task: ${error}`;
    } finally {
      setSnackbarMessage(message);
      setOpenSnackbar(true);
      handleClose();
    }
  }

  return (
    <div>
      <IconButton
        aria-label="task-management"
        id="task-mangement"
        aria-controls={open ? "task-management" : undefined}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": buttonId,
          },
        }}
      >
        <MenuItem
          id="edit-task"
          onClick={() =>
            handleEditOpen(taskName, taskDescription, taskDueDate, taskIndex)
          }
        >
          Edit
        </MenuItem>
        <MenuItem id="delete-task" onClick={() => deleteTask(taskIndex)}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TaskManagerItemMenu;
