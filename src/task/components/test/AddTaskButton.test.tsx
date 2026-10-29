import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import AddTaskButton from "../AddTaskButton";
import { TaskProvider } from "../../TaskContext";
import TaskDialog from "../TaskDialog";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <TaskProvider>{children}</TaskProvider>;
};

describe("Add Button Component tests", () => {
  it("should render the button", async () => {
    render(<AddTaskButton />, { wrapper: Wrapper });
    const button = screen.getByTestId("AddIcon");
    expect(button).toBeInTheDocument();
  });

  it("should open TaskDialog when clicked", async () => {
    render(
      <>
        <AddTaskButton />
        <TaskDialog />
      </>,
      { wrapper: Wrapper },
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId("AddIcon"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
