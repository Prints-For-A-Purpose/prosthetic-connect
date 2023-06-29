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
import { Switch, changeTheme, useTheme } from "@nextui-org/react";

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  const { type, isDark } = useTheme();

  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  const handleChange3 = () => {
    const nextTheme = isDark ? "light" : "dark";
    window.localStorage.setItem("data-theme", nextTheme); // you can use any storage
    changeTheme(nextTheme);
  };

  return (
    <>
      <SiteHeadingAndNav
        isDark={isDark}
        handleChange3={handleChange3}
      ></SiteHeadingAndNav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/new-question" element={<QuestionsPage />} />
          <Route path="/requests/:id" element={<Request isDark={isDark} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/About-us" element={<AboutUs />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/Donations" element={<Donations />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {/* <Switch checked={isDark} onChange={handleChange} /> */}
    </>
  );
}
