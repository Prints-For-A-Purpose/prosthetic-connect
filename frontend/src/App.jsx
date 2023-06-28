import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewHome from "./pages/NewHome";
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
import NewRequest from "./pages/NewRequest";
import AboutUs from "./pages/Aboutus";

export default function App() {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);
  return (
    <>
      <div className={`site-heading-and-nav`}>
        <SiteHeadingAndNav />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-home" element={<NewHome />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/new-home/:id" element={<NewHome />} />
          <Route path="/new-question" element={<QuestionsPage />} />
          <Route path="/requests/:id" element={<Request />} />
          <Route path="/new-requests/:id" element={<NewRequest />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/About-us" element={<AboutUs />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
