import TaskManager from "./task/TaskManager";
import "./App.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TaskProvider } from "./task/TaskContext";

const theme = createTheme({ cssVariables: true });

function App() {
  return (
    <>
      <TaskProvider>
        <ThemeProvider theme={theme}>
          <TaskManager></TaskManager>
        </ThemeProvider>
      </TaskProvider>
    </>
  );
}

export default App;
