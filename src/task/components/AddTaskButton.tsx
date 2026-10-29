import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import TaskContext from "../TaskContext";
import "../TaskManager.scss";

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
