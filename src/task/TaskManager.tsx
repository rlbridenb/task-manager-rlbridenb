import Card from "@mui/material/Card";
import AddTaskButton from "./components/AddTaskButton";
import TaskDialog from "./components/TaskDialog";
import "./TaskManager.scss";
import TaskContext from "./TaskContext";
import { useContext } from "react";
import TaskManagerItemsList from "./components/TaskManagerItemsList";

const TaskManager = () => {
  const { taskListState } = useContext(TaskContext);
  const [taskList, _setTaskList] = taskListState;

  return (
    <>
      <Card className="card">
        <div className="card-title-flex-container">
          <h1>Task Manager</h1>
          <AddTaskButton />
        </div>
        <div className="task-list-flex-container">
          {taskList.length > 0 ? (
            <TaskManagerItemsList />
          ) : (
            <p className="no-tasks-text">No tasks to display</p>
          )}
        </div>
      </Card>
      <TaskDialog />
      {/* <TaskSnackbar
        message={snackbarMessage}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      /> */}
    </>
  );
};

export default TaskManager;
