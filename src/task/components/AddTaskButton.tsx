import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import TaskContext from "../TaskContext";
import "../TaskManager.scss";

const AddTaskButton = () => {
  const { dialogOpenState, taskDefaultsState } = useContext(TaskContext);
  const [_dialogOpen, setdialogOpen] = dialogOpenState;
  const [_taskDefaults, setTaskDefaults] = taskDefaultsState;

  function handleClick() {
    setTaskDefaults({
      index: 0,
      name: "",
      description: "",
      dueDate: null,
    });
    setdialogOpen(true);
  }

  return (
    <IconButton id="add-task" aria-label="add-task" onClick={handleClick}>
      <AddIcon />
    </IconButton>
  );
};

export default AddTaskButton;
