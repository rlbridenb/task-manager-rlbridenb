import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskSnackbar from "../TaskSnackBar";
import TaskContext from "../../TaskContext";
import userEvent from "@testing-library/user-event";
import { type ReactNode } from "react";

let snackbarOpen = true;
const setSnackbarOpen = vi.fn(() => {
  snackbarOpen = !snackbarOpen;
});
const snackbarOpenState = [snackbarOpen, setSnackbarOpen];
const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <TaskContext.Provider value={{ snackbarOpenState: snackbarOpenState }}>
      {children}
    </TaskContext.Provider>
  );
};

describe("Task Snackbar tests", () => {
  it("should render the snackbar", () => {
    render(<TaskSnackbar message={"Test message"} />, { wrapper: Wrapper });
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should close when action button clicked", async () => {
    render(<TaskSnackbar message={"Test message"} />, { wrapper: Wrapper });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Ok"))
    waitFor(async () => {
      const snackbarEl = await screen.getByText("Test message")
      expect(snackbarEl).not.toBeInTheDocument()
    })
  });
});
