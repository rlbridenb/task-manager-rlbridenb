import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskContext from "../../TaskContext";
import TaskList from "../TaskList";
import type { ReactNode } from "react";
import type { TaskInfo } from "../../../types/types";

let dialogOpen = true;
let editingTask = false;
let snackbarMessage = "Test message";
let snackbarOpen = false;
let taskDefaults = {};
let taskList: TaskInfo[] = [
  {
    name: "Task Name",
    description: "Task description text",
    dueDate: "",
    completed: false,
  },
];

const setDialogOpen = vi.fn(() => {
  dialogOpen = !dialogOpen;
});
const setEditingTask = vi.fn(() => {
  editingTask = !editingTask;
});
const setSnackbarMessage = vi.fn();
const setSnackbarOpen = vi.fn();
const setTaskDefaults = vi.fn();
const setTaskList = vi.fn((any) => (taskList = any));

const dialogOpenState = [dialogOpen, setDialogOpen];
const editingTaskState = [editingTask, setEditingTask];
const snackbarMessageState = [snackbarMessage, setSnackbarMessage];
const snackbarOpenState = [snackbarOpen, setSnackbarOpen];
const taskDefaultsState = [taskDefaults, setTaskDefaults];
const taskListState = [taskList, setTaskList];

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <TaskContext.Provider
      value={{
        dialogOpenState: dialogOpenState,
        editingTaskState: editingTaskState,
        snackbarMessageState: snackbarMessageState,
        snackbarOpenState: snackbarOpenState,
        taskDefaultsState: taskDefaultsState,
        taskListState: taskListState,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

describe("TaskList tests", () => {
  it("should render the list", () => {
    render(<TaskList />, { wrapper: Wrapper });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
