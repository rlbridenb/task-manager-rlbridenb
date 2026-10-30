import { useContext, useReducer } from "react";
import Stack from "@mui/material/Stack";
import Task from "./Task";
import { type TaskInfo } from "../../types/types";
import TaskContext from "../TaskContext";
import "../TaskManager.scss";

const TaskList = () => {
  const { taskListState } = useContext(TaskContext);
  const [taskList, _setTaskList] = taskListState;

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  function refreshList() {
    forceUpdate();
  }

  const listItems = (
    <Stack spacing={2} className="task-list">
      {taskList.map((task: TaskInfo, index: number) => (
        <Task
          key={index}
          taskIndex={index}
          taskName={task.name}
          taskDescription={task.description}
          taskDueDate={task.dueDate}
          taskStatus={task.completed}
          refreshList={refreshList}
        />
      ))}
    </Stack>
  );

  return listItems;
};

export default TaskList;
