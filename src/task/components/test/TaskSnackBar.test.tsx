import "@testing-library/jest-dom";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskSnackbar from "../TaskSnackBar";
import TaskContext from "../../TaskContext";

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
});
