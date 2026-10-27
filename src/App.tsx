import TaskManager from "./task/TaskManager";
import "./App.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({ cssVariables: true });

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <TaskManager></TaskManager>
      </ThemeProvider>
    </>
  );
}

export default App;
