import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskProvider } from "../../TaskContext";
import TaskDialog from "../TaskDialog";
import TaskMenu from "../TaskMenu";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <TaskProvider>{children}</TaskProvider>;
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

  it("should open dialog when edit is clicked", async () => {
    render(
      <>
        <TaskMenu
          taskName="Task name"
          taskDescription="Task description text goes here"
          taskDueDate="10/26/2026"
          taskIndex={0}
        />
        <TaskDialog />
      </>,
      { wrapper: Wrapper },
    );
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(
      screen.queryAllByRole("menuitem")[0] as HTMLAnchorElement,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should delete task when delete is clicked", async () => {
    render(
      <TaskMenu
        taskName="Task name"
        taskDescription="Task description text goes here"
        taskDueDate="10/26/2026"
        taskIndex={0}
      />,
      { wrapper: Wrapper },
    );
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(
      screen.queryAllByRole("menuitem")[1] as HTMLAnchorElement,
    );

    /**
     * I would have preferred to check the taskList and see if the provided task
     * still existed, but I was not sure how to access it since it is within the TaskProvider.
     * This was the next best option I could think of, because if the button is no longer there,
     * then the code reached 'handleClose', so 'deleteTask()' was called. However it is possible
     * the delete operation failed and handleClose was still reached.
     */
    expect(screen.queryAllByRole("menuitem")[1] as HTMLElement).toBeUndefined();
  });
});
