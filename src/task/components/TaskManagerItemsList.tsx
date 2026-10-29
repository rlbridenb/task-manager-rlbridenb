import Stack from "@mui/material/Stack";
import TaskManagerItem from "./TaskManagerItem";
import { type TaskItem } from "../../types/types";
import "../TaskManager.scss";
import TaskContext from "../TaskContext";
import { useContext } from "react";

const TaskManagerItemsList = () => {
  const { taskListState } = useContext(TaskContext);
  const [taskList, _setTaskList] = taskListState;

  const listItems = (
    <Stack spacing={2} className="task-list">
      {taskList.map((task: TaskItem, index: number) => (
        <TaskManagerItem
          key={index}
          taskIndex={index}
          taskName={task.name}
          taskDescription={task.description}
          taskDueDate={task.dueDate}
          taskStatus={task.completed}
        />
      ))}
    </Stack>
  );

  return listItems;
};

export default TaskManagerItemsList;
