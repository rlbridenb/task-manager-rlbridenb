import React, { createContext, useState, type ReactNode } from "react";
import type { TaskItem } from "../types/types";

interface TaskContext {
  taskListState: [TaskItem[], React.Dispatch<React.SetStateAction<TaskItem[]>>];
  editingTaskState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  modalOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  snackbarOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  snackbarMessageState: [string, React.Dispatch<React.SetStateAction<string>>];
  taskDefaultsState: [any, React.Dispatch<React.SetStateAction<any>>];
}

const TaskContext = createContext<TaskContext>({} as TaskContext);

export const TaskProvider = (props: { children: ReactNode }) => {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [editingTask, setEditingTask] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
        taskListState: [taskList, setTaskList] as const,
        editingTaskState: [editingTask, setEditingTask] as const,
        modalOpenState: [modalOpen, setModalOpen] as const,
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
