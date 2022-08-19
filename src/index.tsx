import React from "react";
import ReactDOM from "react-dom/client";

// import fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const defaultTheme = createTheme();

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: defaultTheme.spacing(0.5),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingTop: defaultTheme.spacing(1),
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
