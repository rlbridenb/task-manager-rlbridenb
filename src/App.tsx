import { TaskProvider } from "./task/TaskContext";
import TaskManager from "./task/TaskManager";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.scss";

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
