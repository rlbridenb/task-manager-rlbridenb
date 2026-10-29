import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import "../TaskManager.scss";
import { useContext } from "react";
import TaskContext from "../TaskContext";

const AddTaskButton = () => {
  const { dialogOpenState } = useContext(TaskContext);
  const [_, setdialogOpen] = dialogOpenState;

  function handleClick() {
    setdialogOpen(true);
  }

  return (
    <IconButton id="add-task" aria-label="add-task" onClick={handleClick}>
      <AddIcon />
    </IconButton>
  );
};

export default AddTaskButton;
