import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import TaskSnackbar from "../TaskSnackBar";
import "@testing-library/jest-dom";

describe("Task Snackbar tests", () => {
  it("should render the snackbar", () => {
    const setOpenSnackbar = vi.fn();
    let openSnackbar = true;

    render(
      <TaskSnackbar
        message={"Test message"}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />,
    );

    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  it("should close when action button clicked", async () => {
    var openSnackbar = true;
    const setOpenSnackbar = vi.fn(() => {
      openSnackbar = !openSnackbar;
    });

    render(
      <TaskSnackbar
        message={"Test message"}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />,
    );

    expect(screen.getByRole("presentation")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Ok"));
    expect(setOpenSnackbar).toHaveBeenCalledTimes(1);
    expect(openSnackbar).toBeFalsy();
  });
});
