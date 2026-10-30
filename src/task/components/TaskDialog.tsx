import { useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import TaskContext from "../TaskContext";
import { type TaskInfo } from "../../types/types";
import "../TaskManager.scss";

const TaskDialog = () => {
  const {
    dialogOpenState,
    editingTaskState,
    snackbarMessageState,
    snackbarOpenState,
    taskDefaultsState,
    taskListState,
  } = useContext(TaskContext);

  const [dialogOpen, setdialogOpen] = dialogOpenState;
  const [editingTask, setEditingTask] = editingTaskState;
  const [_snackbarMessage, setSnackbarMessage] = snackbarMessageState;
  const [_snackbarOpen, setSnackbarOpen] = snackbarOpenState;
  const [taskDefaults, _setTaskDefaults] = taskDefaultsState;
  const [taskList, setTaskList] = taskListState;
  /**
   * Handles closing modal and resetting state values (open, editingTask, taskDefaults)
   */
  const handleClose = () => {
    setdialogOpen(false);
    setEditingTask(false);
  };

  /**
   * Handles form submission. Saves changes if editing task, or creates new
   * task if adding task.
   * @param event
   */
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries((formData as any).entries());
    if (editingTask) {
      saveTask(
        formJson.name,
        formJson.description,
        formJson.dueDate,
        taskDefaults.index,
      );
    } else {
      addTask(formJson.name, formJson.description, formJson.dueDate);
    }
    handleClose();
  };

  /**
   * Adds new task to taskList
   * @param taskName name of task
   * @param taskDescription description of task
   * @param taskDueDate due date of task
   */
  function addTask(
    taskName: string,
    taskDescription: string,
    taskDueDate: Date,
  ) {
    let message = "";
    try {
      const TaskInfo: TaskInfo = {
        name: taskName,
        description: taskDescription,
        dueDate: taskDueDate,
        completed: false,
      };
      const taskListCopy = [...taskList, TaskInfo].sort(
        (a: TaskInfo, b: TaskInfo) => Number(a.completed) - Number(b.completed),
      );
      setTaskList(taskListCopy);
      localStorage.setItem("taskList", JSON.stringify(taskListCopy));
      message = "Task created";
    } catch (error) {
      message = `Error when creating task: ${error}`;
    }
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  }

  /**
   * Updates existing task in taskList with new values
   * @param taskName updated name of task
   * @param taskDescription updated description of task
   * @param taskDueDate updated task due date
   * @param taskIndex index of task in taskList
   */
  function saveTask(
    taskName: string,
    taskDescription: string,
    taskDueDate: Date,
    taskIndex: number,
  ) {
    let message = "";
    try {
      const taskListCopy = taskList;
      taskListCopy[taskIndex].name = taskName;
      taskListCopy[taskIndex].description = taskDescription;
      taskListCopy[taskIndex].dueDate = taskDueDate;
      setTaskList(taskListCopy);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      message = "Task updated";
    } catch (error) {
      message = `Error when updating task: ${error}`;
    }
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  }

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>{editingTask ? "Edit" : "Add"} Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="task-form" className="form-container">
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            label="Name"
            type="name"
            defaultValue={taskDefaults.name}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              aria-label="due-date"
              name="dueDate"
              label="Due Date"
              defaultValue={taskDefaults.dueDate}
              slotProps={{
                field: { clearable: true },
              }}
            />
          </LocalizationProvider>
          <TextField
            id="description"
            label="Description"
            name="description"
            type="description"
            defaultValue={taskDefaults.description}
            multiline
            rows={4}
          />
        </form>
      </DialogContent>
      <DialogActions style={{ padding: "15px" }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit" form="task-form">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
