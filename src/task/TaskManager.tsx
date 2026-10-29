import { useContext } from "react";
import Card from "@mui/material/Card";
import AddTaskButton from "./components/AddTaskButton";
import TaskContext from "./TaskContext";
import TaskDialog from "./components/TaskDialog";
import TaskList from "./components/TaskList";
import TaskSnackbar from "./components/TaskSnackBar";
import "./TaskManager.scss";

const TaskManager = () => {
  const { taskListState, snackbarMessageState } = useContext(TaskContext);
  const [taskList, _setTaskList] = taskListState;
  const [snackbarMessage, _setSnackbarMessage] = snackbarMessageState;

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
