import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import { createSkill } from "../adapters/skills-adapter";

import ChooseYourSkills from "../components/ChooseYourSkills";

const sendSkills = async (user_id, skill_name) => {
  try {
    const [response] = await createSkill(user_id, skill_name);
    return response;
  } catch (error) {
    throw error;
  }
};

const sendAllSkills = async (user_id, array) => {
  const promises = array.map((e) => sendSkills(user_id, e));
  try {
    await Promise.all(promises);
  } catch (error) {}
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedSkills, setSkills] = useState([]);

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!username || !password || !role)
      return setErrorText("Missing username, password, or role");
    const is_fabricator = role === "fabricator" ? true : false;
    if (is_fabricator && selectedSkills.length === 0) {
      return setErrorText("Missing at least one fabricator skill.");
    }

    const [user, error] = await createUser({
      username,
      password,
      is_fabricator,
    });
    const user_id = user.id;

    if (is_fabricator && user_id && selectedSkills) {
      sendAllSkills(user_id, selectedSkills);
    }
    if (error) return setErrorText(error.statusText);
    setCurrentUser(user);
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "role") setRole(value);
  };

  return (
    <>
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
        aria-label="form"
      >
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <label>
          Recipient
          <input
            type="radio"
            value="recipient"
            name="role"
            checked={role === "recipient"}
            onChange={handleChange}
          />
        </label>
        <label>
          Fabricator
          <input
            type="radio"
            value="fabricator"
            name="role"
            checked={role === "fabricator"}
            onChange={handleChange}
          />
        </label>
        <ChooseYourSkills
          role={role}
          selectedSkills={selectedSkills}
          setSkills={setSkills}
        ></ChooseYourSkills>
        <button>Sign Up Now!</button>
        <p>
          Already have an account with us? <Link to="/login">Log in!</Link>
        </p>
      </form>
      {!!errorText && <p>{errorText}</p>}
    </>
  );
}
