import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Task from "./Task";
import { type TaskItem } from "../../types/types";
import TaskContext from "../TaskContext";
import "../TaskManager.scss";

const TaskList = () => {
  const { taskListState } = useContext(TaskContext);
  const [taskList, _setTaskList] = taskListState;

  const listItems = (
    <Stack spacing={2} className="task-list">
      {taskList.map((task: TaskItem, index: number) => (
        <Task
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

export default TaskList;
