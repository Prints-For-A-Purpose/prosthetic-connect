import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

import ChooseYourSkills from "../components/ChooseYourSkills";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!username || !password || !role)
      return setErrorText("Missing username, password, or role");

    const is_fabricator = role === "fabricator" ? true : false;

    const [user, error] = await createUser({
      username,
      password,
      is_fabricator,
    });
    if (error) return setErrorText(error.statusText);

    setCurrentUser(user);
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "role") setRole(value);
    console.log(role);
  };

  return (
    <>
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
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
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
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
