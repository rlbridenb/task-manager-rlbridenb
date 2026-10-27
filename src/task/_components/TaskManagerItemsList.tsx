import Stack from "@mui/material/Stack";
import TaskManagerItem from "./TaskManagerItem";
import { type TaskItem } from "../../types/types";
import "../TaskManager.scss";

const TaskManagerItemsList = ({
  taskList,
  setTaskList,
  setTaskDefaults,
  setEditingTask,
  setOpen,
  setSnackbarMessage,
  setOpenSnackbar,
}: {
  taskList: TaskItem[];
  setTaskList: Function;
  setTaskDefaults: Function;
  setEditingTask: Function;
  setOpen: Function;
  setSnackbarMessage: Function;
  setOpenSnackbar: Function;
}) => {
  const listItems = (
    <Stack spacing={2} className="task-list">
      {taskList.map((task: TaskItem, index: number) => (
        <TaskManagerItem
          key={index}
          taskList={taskList}
          setTaskList={setTaskList}
          setTaskDefaults={setTaskDefaults}
          setEditingTask={setEditingTask}
          setOpen={setOpen}
          setSnackbarMessage={setSnackbarMessage}
          setOpenSnackbar={setOpenSnackbar}
          taskName={task.name}
          taskDescription={task.description}
          taskDueDate={task.dueDate}
          taskStatus={task.completed}
          taskIndex={index}
        />
      ))}
    </Stack>
  );

  return listItems;
};

export default TaskManagerItemsList;
