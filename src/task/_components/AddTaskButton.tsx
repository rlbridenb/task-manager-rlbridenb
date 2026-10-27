import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import "../TaskManager.scss";

const AddTaskButton = ({ setOpen }: { setOpen: Function }) => {
  return (
    <IconButton aria-label="add-task" onClick={() => setOpen(true)}>
      <AddIcon />
    </IconButton>
  );
};

export default AddTaskButton;
