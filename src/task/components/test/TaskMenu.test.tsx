import "@testing-library/jest-dom";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskContext from "../../TaskContext";
import TaskMenu from "../TaskMenu";
import type { TaskInfo } from "../../../types/types";

let dialogOpen = true;
let editingTask = false;
let snackbarMessage = "Test message";
let snackbarOpen = false;
let taskDefaults = {};
let taskList: TaskInfo[] = [];

const setDialogOpen = vi.fn(() => {
  dialogOpen = !dialogOpen;
});
const setEditingTask = vi.fn(() => {
  editingTask = !editingTask;
});
const setSnackbarMessage = vi.fn();
const setSnackbarOpen = vi.fn();
const setTaskDefaults = vi.fn((any) => (taskDefaults = any));
const setTaskList = vi.fn((any) => (taskList = any));

const dialogOpenState = [dialogOpen, setDialogOpen];
let editingTaskState = [editingTask, setEditingTask];
const snackbarMessageState = [snackbarMessage, setSnackbarMessage];
const snackbarOpenState = [snackbarOpen, setSnackbarOpen];
let taskDefaultsState = [taskDefaults, setTaskDefaults];
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

describe("TaskMenu tests", () => {
  it("should render the menu", () => {
    render(
      <TaskMenu
        taskName="Task name"
        taskDescription="Task description text goes here"
        taskDueDate="10/26/2026"
        taskIndex={0}
      />,
      { wrapper: Wrapper },
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should open modal when ", async () => {
    render(
      <TaskMenu
        taskName="Task name"
        taskDescription="Task description text goes here"
        taskDueDate="10/26/2026"
        taskIndex={0}
      />,
      { wrapper: Wrapper },
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
