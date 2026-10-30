import "@testing-library/jest-dom";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskContext from "../../TaskContext";
import TaskDialog from "../TaskDialog";
import { type TaskInfo } from "../../../types/types";

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
const setTaskDefaults = vi.fn();
const setTaskList = vi.fn();

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

describe("Task Dialog tests", () => {
  it("should render the dialog", () => {
    render(<TaskDialog />, { wrapper: Wrapper });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should require name field", async () => {
    render(<TaskDialog />, { wrapper: Wrapper });
    let requiredNameField = screen.getAllByRole(
      "textbox",
    )[0] as HTMLAnchorElement;
    expect(requiredNameField).toBeInvalid();
    await userEvent.type(requiredNameField, "Task Name");
    expect(requiredNameField).toBeValid();
  });

  it("add new task on save", async () => {
    render(<TaskDialog />, { wrapper: Wrapper });
    let requiredNameField = screen.getAllByRole(
      "textbox",
    )[0] as HTMLAnchorElement;
    await userEvent.type(requiredNameField, "Task Name");
    await userEvent.click(screen.getByText("Submit"));
    expect(requiredNameField).toBeValid();
  });
});
