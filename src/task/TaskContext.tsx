import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useState,
} from "react";
import type { TaskInfo } from "../types/types";

interface TaskContext {
  taskListState: [TaskInfo[], Dispatch<SetStateAction<TaskInfo[]>>];
  editingTaskState: [boolean, Dispatch<SetStateAction<boolean>>];
  dialogOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
  snackbarOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
  snackbarMessageState: [string, Dispatch<SetStateAction<string>>];
  taskDefaultsState: [any, Dispatch<SetStateAction<any>>];
}

const TaskContext = createContext<any>({});

export const TaskProvider = (props: { children: ReactNode }) => {
  const [taskList, setTaskList] = useState<TaskInfo[]>([]);
  const [editingTask, setEditingTask] = useState<boolean>(false);
  const [dialogOpen, setdialogOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [taskDefaults, setTaskDefaults] = useState({
    index: 0,
    name: "",
    description: "",
    dueDate: null,
  });

  return (
    <TaskContext.Provider
      value={{
        taskListState: [taskList, setTaskList],
        editingTaskState: [editingTask, setEditingTask],
        dialogOpenState: [dialogOpen, setdialogOpen],
        snackbarOpenState: [snackbarOpen, setSnackbarOpen],
        snackbarMessageState: [snackbarMessage, setSnackbarMessage],
        taskDefaultsState: [taskDefaults, setTaskDefaults],
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
