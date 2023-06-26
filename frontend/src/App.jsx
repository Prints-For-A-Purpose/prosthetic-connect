import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
import NotFoundPage from "./pages/NotFound";
import UserContext from "./contexts/current-user-context";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import QuestionsPage from "./pages/Questions";
import Request from "./pages/Request";
import AboutUs from "./pages/Aboutus";
import Donations from "./pages/Donations";

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);
  const themeClass = isDarkMode ? "light" : "dark";
  return (
    <>
      <div className={`site-heading-and-nav ${themeClass}`}>
        <SiteHeadingAndNav />
      </div>
      <main className={`app ${themeClass}`}>
        <button onClick={toggleTheme}>dark/light Mode</button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/new-question" element={<QuestionsPage />} />
          <Route path="/requests/:id" element={<Request />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/About-us" element={<AboutUs />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/Donations" element={<Donations />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
