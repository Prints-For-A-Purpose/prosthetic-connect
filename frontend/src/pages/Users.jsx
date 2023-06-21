import { useEffect, useState } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import UserLink from "../components/UserLink";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  useEffect(() => {
    const filteredResults = users.filter((user) => {
      const { name, username } = user;
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const lowerCaseName = name ? name.toLowerCase() : ""; // Handle cases where 'name' is missing or undefined
      const lowerCaseUsername = username ? username.toLowerCase() : ""; // Handle cases where 'username' is missing or undefined
      return (
        lowerCaseName.includes(lowerCaseSearchTerm) ||
        lowerCaseUsername.includes(lowerCaseSearchTerm)
      );
    });
    setFilteredUsers(filteredResults);
  }, [searchTerm, users]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="UsersContainer">
      <h1 className="Title">Users</h1>
      <input
        type="text"
        className="SearchInput"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="UserList">
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <UserLink user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}



