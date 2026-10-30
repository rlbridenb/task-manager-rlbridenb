import { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import AddTaskButton from "./components/AddTaskButton";
import TaskContext from "./TaskContext";
import TaskDialog from "./components/TaskDialog";
import TaskList from "./components/TaskList";
import TaskSnackbar from "./components/TaskSnackBar";
import "./TaskManager.scss";
import type { TaskInfo } from "../types/types";

const TaskManager = () => {
  const { taskListState, snackbarMessageState } = useContext(TaskContext);
  const [taskList, setTaskList] = taskListState;
  const [snackbarMessage, _setSnackbarMessage] = snackbarMessageState;

  useEffect(() => {
    const localTaskList = localStorage.getItem("taskList");
    if (!localTaskList) {
      return;
    }
    setTaskList(
      JSON.parse(localTaskList).sort(
        (a: TaskInfo, b: TaskInfo) => Number(a.completed) - Number(b.completed),
      ),
    );
  }, []);

  return (
    <>
      <Card className="card">
        <div className="card-title-flex-container">
          <h1>Task Manager</h1>
          <AddTaskButton />
        </div>
        <div className="task-list-flex-container">
          {taskList.length > 0 ? (
            <TaskList />
          ) : (
            <p className="no-tasks-text">No tasks to display</p>
          )}
        </div>
      </Card>
      <TaskDialog />
      <TaskSnackbar message={snackbarMessage} />
    </>
  );
};

export default TaskManager;
