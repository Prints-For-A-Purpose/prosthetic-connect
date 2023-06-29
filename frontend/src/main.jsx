// import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import UserContextProvider from "./contexts/CurrentUserContextProvider.jsx";
import { NextUIProvider, createTheme } from "@nextui-org/react";
// import "./index.css";

const darkTheme = createTheme({
  type: "dark",
});

const lightTheme = createTheme({
  type: "light",
});

// const [currTheme, setCurrTheme] = useState(lightTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider theme={lightTheme}>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </NextUIProvider>
);
