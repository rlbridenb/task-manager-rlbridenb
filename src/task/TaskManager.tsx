import { useState } from "react";
import Card from "@mui/material/Card";
import AddTaskButton from "./_components/AddTaskButton";
import TaskManagerItemsList from "./_components/TaskManagerItemsList";
import TaskDialog from "./_components/TaskDialog";
import TaskSnackbar from "./_components/TaskSnackBar";
import { type TaskItem } from "../types/types";
import "./TaskManager.scss";

const TaskManager = () => {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [editingTask, setEditingTask] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [taskDefaults, setTaskDefaults] = useState({
    index: 0,
    name: "",
    description: "",
    dueDate: null,
  });

  return (
    <>
      <Card className="card">
        <div className="card-title-flex-container">
          <h1>Task Manager</h1>
          <AddTaskButton setOpen={setOpen} />
        </div>
        <div className="task-list-flex-container">
          {taskList.length > 0 ? (
            <TaskManagerItemsList
              taskList={taskList}
              setTaskList={setTaskList}
              setTaskDefaults={setTaskDefaults}
              setEditingTask={setEditingTask}
              setOpen={setOpen}
              setSnackbarMessage={setSnackbarMessage}
              setOpenSnackbar={setOpenSnackbar}
            />
          ) : (
            <p className="no-tasks-text">No tasks to display</p>
          )}
        </div>
      </Card>
      <TaskDialog
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        open={open}
        setOpen={setOpen}
        setSnackbarMessage={setSnackbarMessage}
        setOpenSnackbar={setOpenSnackbar}
        taskDefaults={taskDefaults}
        setTaskDefaults={setTaskDefaults}
        taskList={taskList}
        setTaskList={setTaskList}
      />
      <TaskSnackbar
        message={snackbarMessage}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </>
  );
};

export default TaskManager;
