import { useState, useEffect } from "react";
import NextUserContext from "./next-user-context";
import { createTheme } from "@nextui-org/react";
import { getDocumentTheme } from "@nextui-org/react";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const context = { currentUser, setCurrentUser };

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
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
