import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../adapters/user-adapter";
import UserLink from "../components/UserLink";
import {
  Modal,
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Input,
  Row,
  Button,
  Radio,
  Spacer,
  useModal,
  Switch,
  Card,
  Badge,
  User,
} from "@nextui-org/react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

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
    // <div className="UsersContainer">
    <>
      <Row css={{ justifyContent: "center" }}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $purple600 -20%, $pink600 100%",
            textAlign: "center",
          }}
          weight="bold"
        >
          Users
        </Text>
      </Row>
      <Spacer y={1}></Spacer>
      <Row css={{ justifyContent: "center" }}>
        <Input
          labelPlaceholder="Search"
          aria-label="Search"
          status="secondary"
          type="text"
          autoFocus={true}
          value={searchTerm}
          clearable
          css={{ width: "80%" }}
          contentLeft={
            <svg fill="none" height={36} viewBox="0 0 24 24" width={36}>
              <path
                d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
                stroke={"var(--nextui-colors-accents6)"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          onChange={handleSearchChange}
        />
      </Row>
      <Spacer y={3}></Spacer>
      {filteredUsers.map((user) => (
        <>
          <Row css={{ justifyContent: "center" }}>
            <Card
              isHoverable
              variant="bordered"
              key={user.id}
              isPressable
              onPress={() => navigate("/users/" + user.id)}
              css={{ maxWidth: "80%" }}
              // onPressUp={() => navigate("/users/" + user.id)}
            >
              <Card.Header>
                <Badge
                  enableShadow
                  color={user.is_fabricator ? "primary" : "secondary"}
                >
                  {user.is_fabricator ? "Fabricator" : "Recipient"}
                </Badge>
                <User
                  zoomed
                  src={user.pfp_url}
                  bordered
                  color="gradient"
                  size="xl"
                >
                  <User.Link href={"/users/" + user.id}>
                    @{user.username}
                  </User.Link>
                </User>
              </Card.Header>
            </Card>
          </Row>
          <Spacer y={0.5}></Spacer>
        </>
      ))}
      {/* </ul> */}
      {/* <ul className="UserList">
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <UserLink user={user} />
          </li>
        ))}
      </ul> */}
    </>
  );
}
