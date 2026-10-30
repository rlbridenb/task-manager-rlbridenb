import "@testing-library/jest-dom";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskContext from "../../TaskContext";
import { type TaskInfo } from "../../../types/types";
import Task from "../Task";

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
        refreshList={vi.fn()}
      />,
      { wrapper: Wrapper },
    );
    expect(screen.getByText("Task description text")).toBeInTheDocument();
  });

  it("should mark task completed on checkbox click", async () => {
    const { rerender } = render(
      <Task
        taskName="Task Name"
        taskDescription="Task description text"
        taskDueDate="10/25/2026"
        taskStatus={false}
        taskIndex={0}
        refreshList={vi.fn()}
      />,
      { wrapper: Wrapper },
    );

    // Check that status text is "To-do" and task completed status is false
    expect(screen.getByText("To-do")).toBeInTheDocument();
    expect(screen.queryByText("Completed")).not.toBeInTheDocument();
    expect(taskList[0].completed).toBeFalsy();

    // Click checkbox
    await userEvent.click(screen.getByRole("checkbox"));

    // Check that taskList was updated and completed status is now true
    expect(setTaskList).toHaveBeenCalledOnce();
    expect(taskList[0].completed).toBeTruthy();

    /**
     * The component was not rerendering with changes despite the value of "completed" being
     * set to true. This was the only solution I was able to get working. While not ideal, it
     * will not pass unless the "completed" field is successfully updated from false to true,
     * which matches with component behavior.
     */
    rerender(
      <Task
        taskName="Task Name"
        taskDescription="Task description text"
        taskDueDate="10/25/2026"
        taskStatus={taskList[0].completed}
        taskIndex={0}
        refreshList={vi.fn()}
      />,
    );

    // Check that status text "To-do" is gone and text is not "Completed"
    expect(screen.queryByText("To-do")).not.toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});
