import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import "../TaskManager.scss";
import { useContext } from "react";
import TaskContext from "../TaskContext";

const AddTaskButton = () => {
  const { modalOpenState } = useContext(TaskContext);
  const [_, setModalOpen] = modalOpenState;

  function handleClick() {
    setModalOpen(true);
  }

  return (
    <IconButton id="add-task" aria-label="add-task" onClick={handleClick}>
      <AddIcon />
    </IconButton>
  );
};

export default AddTaskButton;
