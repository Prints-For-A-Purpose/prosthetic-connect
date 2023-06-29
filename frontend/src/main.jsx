import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import UserContextProvider from "./contexts/CurrentUserContextProvider.jsx";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
// import "./index.css";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

import { getDocumentTheme } from "@nextui-org/react";

const Main = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let theme = window.localStorage.getItem("data-theme");
    setIsDark(theme === "dark");

    const observer = new MutationObserver((mutation) => {
      let newTheme = getDocumentTheme(document?.documentElement);
      setIsDark(newTheme === "dark");
    });

    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </NextUIProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
