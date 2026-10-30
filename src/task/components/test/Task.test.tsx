import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskContext from "../../TaskContext";
import { type ReactNode } from "react";
import { type TaskInfo } from "../../../types/types";
import Task from "../Task";
import userEvent from "@testing-library/user-event";

let dialogOpen = true;
let editingTask = false;
let snackbarMessage = "Test message";
let snackbarOpen = false;
let taskDefaults = {};
let taskList: TaskInfo[] = [
  {
    name: "Task Name",
    description: "Task description text",
    dueDate: new Date("10/25/2026"),
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

describe("Task tests", () => {
  it("should render task item", () => {
    render(
      <Task
        taskName="Task Name"
        taskDescription="Task description text"
        taskDueDate="10/25/2026"
        taskStatus={false}
        taskIndex={0}
      />,
      { wrapper: Wrapper },
    );
    expect(screen.getByText("Task description text")).toBeInTheDocument();
  });

  it("should mark task completed on checkbox click", async () => {
    render(
      <Task
        taskName="Task Name"
        taskDescription="Task description text"
        taskDueDate="10/25/2026"
        taskStatus={false}
        taskIndex={0}
      />,
      { wrapper: Wrapper },
    );

    expect(screen.getByText("To-do")).toBeInTheDocument();
    expect(screen.queryByText("Completed")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("checkbox"));
    expect(setTaskList).toHaveBeenCalledOnce();

    expect(screen.queryByText("To-do")).not.toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});
