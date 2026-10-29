import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import { useContext } from "react";
import TaskContext from "../TaskContext";

export default function TaskSnackbar({ message }: { message: string }) {
  const { snackbarOpenState } = useContext(TaskContext);
  const [snackbarOpen, setSnackbarOpen] = snackbarOpenState;

  /**
   * Handles closing snackbar
   * @param _event the snackbar onClose event
   * @param reason reason the snackbar might close (e.g., clickaway, timeout)
   * @returns
   */
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    // Prevents snackbar from closing on page click
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <Button color="primary" size="small" onClick={handleClose}>
      Ok
    </Button>
  );

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}
