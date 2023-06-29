import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useContext, useMemo, useEffect } from "react";
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
} from "@nextui-org/react";

import { logUserOut, logUserIn } from "../adapters/auth-adapter";
import { homePagination } from "../adapters/request-adapter";

export default function SiteHeadingAndNav({ isDark, handleChange3 }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const is_active = pathname.split("/")[1];
  const [s, setS] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState(new Set(["3D Printing"]));

  const [visible1, setVisible1] = useState(false);
  const handler1 = () => setVisible1(true);
  const closeHandler1 = () => {
    setVisible1(false);
  };

  // const { setVisible2, bindings2 } = useModal();
  const { setVisible, bindings } = useModal();
  const [errorText, setErrorText] = useState("");

  const [checked, setChecked] = useState("");

  const handleLogout = async () => {
    logUserOut();
    localStorage.clear();
    setCurrentUser(null);
    await homePagination(1);
    return navigate("/");
  };

  useEffect(() => {
    const load = async () => {
      if ([s][0].currentKey === "logout" || [s][0].anchorKey === "logout") {
        handleLogout();
      } else if ([s][0].currentKey.split("/")[1] === "users") {
        return navigate(`${[s][0].currentKey}`);
      }
    };
    load();
  }, [s]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(
      Object.fromEntries(formData.entries())
    );
    if (error) return setErrorText(error.statusText);
    setCurrentUser(user);
    setChecked("");
    setPassword("");
    setUsername("");
    setSelected(["3D Printing"]);
    return navigate(`/users/${user.id}`);
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!username || !password || !checked)
      return setErrorText("Missing username, password, or role");
    const is_fabricator = checked === "fabricator" ? true : false;
    const arr = Array.from(selected);
    if (is_fabricator && arr.length === 0) {
      return setErrorText("Missing at least one fabricator skill.");
    }
    const [user, error] = await createUser({
      username,
      password,
      is_fabricator,
    });
    const user_id = user.id;

    if (is_fabricator && user_id && arr) {
      sendAllSkills(user_id, arr);
    }
    if (error) return setErrorText(error.statusText);
    setCurrentUser(user);
    setChecked("");
    setPassword("");
    setUsername("");
    setSelected(["3D Printing"]);
    setVisible(false);
    return navigate(`/users/${user.id}`);
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <>
      <Navbar isBordered variant="floating">
        <Navbar.Brand css={{ mr: "$4" }}>
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 1280.000000 1280.000000"
              fill="#7827c8"
            >
              <path
                d="M10815 12693c-357-31-818-163-1465-420-445-176-606-261-732-388-285-285-360-568-345-1305 4-157 11-321 17-365 35-254 143-490 294-641 143-143 246-203 1004-586 402-204 552-284 552-297 0-67-128-491-201-666-188-453-576-1049-1073-1650-234-282-402-467-795-877l-275-286-66 161c-76 185-106 246-194 395-215 361-562 707-928 924-131 77-222 121-413 198-179 73-182 75-190 158-4 37-20 132-35 212-94 475-297 908-609 1300-97 122-339 364-461 461-420 334-917 557-1420 636-149 23-758 26-910 4-233-33-562-133-819-250-356-161-603-341-933-680-226-231-322-367-479-673C118 7623 21 7256 4 6777c-20-541 102-1065 356-1531 454-832 1223-1376 2195-1552 108-19 134-27 151-47 11-13 48-106 83-206 144-423 338-790 608-1152 575-771 1332-1363 2236-1750 706-303 1401-452 2022-436 253 6 278 12 466 108 286 145 502 311 835 644 319 318 516 548 824 960 753 1008 1516 2352 2098 3695 388 898 674 1774 832 2553 73 363 75 381 75 957-1 532-8 682-46 960-103 748-306 1392-587 1859-107 177-207 306-347 446-321 321-612 441-990 408zm210-778c134-57 311-231 448-440 249-382 437-975 522-1650 46-369 46-1125-1-1445-40-271-177-801-324-1255-158-484-448-1222-649-1649l-46-98-115 83c-303 219-375 259-479 267-225 16-400-141-401-360 0-116 32-197 107-268 72-68 328-274 441-355 61-43 82-64 82-81 0-26-226-486-271-551-35-51-64-61-110-38-19 10-108 77-199 150-226 181-410 319-462 347-37 20-58 23-148 23-95 0-111-3-162-28-75-37-147-103-183-169-28-50-30-59-29-163 0-145 13-173 135-290 83-80 336-291 617-515 50-41 92-80 92-88 0-37-495-800-723-1114l-70-97-105 95c-135 123-275 215-464 308-298 145-448 179-808 178-249 0-362-13-543-61l-108-29-327 372c-423 479-1301 1483-1996 2281-302 347-563 645-579 662l-31 33 52 107c99 209 134 359 134 588 1 166-15 281-58 416-139 444-532 791-1016 896-113 24-349 24-471 0-677-135-1130-730-1076-1409 25-316 149-577 389-819 264-266 545-383 925-382 175 0 256 11 425 58l124 35 22-22c12-13 594-678 1295-1478 700-800 1322-1511 1383-1580 60-69 118-135 129-146 18-22 18-22-48-95-195-216-323-436-421-724l-47-137-31 6c-115 23-637 331-921 544-281 211-621 535-815 777-325 406-575 928-678 1411-32 151-53 203-109 272-73 90-159 117-468 147-203 20-264 30-401 65-319 84-669 269-929 492-375 322-649 809-732 1303-25 154-26 622 0 770 61 352 230 719 472 1020 77 97 254 274 350 352 249 200 530 340 840 418 474 120 989 77 1450-120 398-171 750-464 988-825 205-311 315-644 367-1116 32-285 52-355 122-420 52-49 125-81 291-125 175-47 308-94 421-151 449-225 788-616 956-1103 53-155 79-286 91-464 12-173 29-243 79-320 112-173 341-223 511-111 103 68 838 802 1294 1290 472 506 1025 1237 1319 1743 356 611 554 1203 573 1708l6 157-39 82c-61 131-62 132-769 495-941 483-988 511-1040 613-9 19-14 37-10 40 8 8 399 19 705 21 219 1 306 13 380 51 68 35 134 104 166 173 26 55 29 73 29 157 0 86-3 101-31 160-36 76-98 141-169 178l-50 26-385 7c-576 11-653 15-667 35-15 20-7 73 24 149 37 93 83 148 161 194 276 161 1152 475 1522 546 92 17 221 13 275-10zM3153 7215c187-49 336-196 392-389 22-74 21-209 0-284-65-222-242-382-461-414-254-37-503 121-591 373-88 253 18 537 244 657 125 66 293 89 416 57zm4862-5289c183-62 361-169 504-303l84-79-199-188c-308-292-511-444-642-482-136-40-591-3-957 76-123 27-172 46-180 70-8 25 10 123 35 188 137 359 432 631 775 713 128 30 210 38 360 35 120-3 151-7 220-30z"
                transform="matrix(.1 0 0 -.1 0 1280)"
              />
            </svg>
          </a>
          <Spacer x={0.5}></Spacer>
          <Text
            b
            css={{
              fontSize: "x-large !important",
              mr: "$11",
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
            hideIn="xs"
          >
            <a href="/">Prints For A Purpose</a>
          </Text>
          <Navbar.Content
            hideIn="xs"
            variant="highlight-rounded"
            activeColor="secondary"
            enableCursorHighlight
          >
            <Navbar.Link
              href="/"
              isActive={
                is_active.toLowerCase() === "" ||
                Number.isInteger(+is_active) ||
                is_active.toLowerCase() === "requests"
              }
            >
              Home
            </Navbar.Link>
            <Navbar.Link
              href="/About-Us"
              isActive={is_active.toLowerCase() === "about-us"}
            >
              About Us
            </Navbar.Link>
            <Navbar.Link
              href="/users"
              isActive={is_active.toLowerCase() === "users"}
            >
              Users
            </Navbar.Link>
            {currentUser && currentUser.is_fabricator === false && (
              <Navbar.Link
                href="/new-question"
                isActive={is_active.toLowerCase() === "new-question"}
              >
                New Request
              </Navbar.Link>
            )}
          </Navbar.Content>
        </Navbar.Brand>
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item>
            <Switch
              shadow
              bordered
              size="xl"
              checked={isDark}
              onChange={handleChange3}
              color="secondary"
              iconOff={
                <svg width={36} height={36} viewBox="0 0 24 24">
                  <g fill="#7827c8">
                    <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
                    <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
                  </g>
                </svg>
              }
              iconOn={
                <svg width={36} height={36} viewBox="0 0 24 24">
                  <path
                    d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
                    fill="#7827c8"
                  />
                </svg>
              }
            ></Switch>
          </Navbar.Item>
          {!(
            is_active.toLowerCase() === "" || Number.isInteger(+is_active)
          ) && (
            <Navbar.Item
              css={{
                "@xsMax": {
                  w: "100%",
                  jc: "center",
                },
              }}
            >
              <Input
                clearable
                status="secondary"
                contentLeft={
                  <svg fill="none" height={16} viewBox="0 0 24 24" width={16}>
                    <path
                      d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
                      stroke={"var(--nextui-colors-accents6)"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                }
                placeholder="Search..."
                onClick={() => navigate("/")}
              />
            </Navbar.Item>
          )}
          {currentUser && (
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    zoomed
                    bordered
                    as="button"
                    color="gradient"
                    size="xl"
                    src={currentUser.pfp_url}
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                disabledKeys={["role"]}
                selectionMode="single"
                selectedKeys={s}
                onSelectionChange={setS}
              >
                <Dropdown.Item key="role" css={{ height: "$18" }}>
                  <Text color="secondary" css={{ d: "flex" }}>
                    @ {currentUser.username}
                  </Text>
                  <Text b color="secondary" css={{ d: "flex" }}>
                    {currentUser.is_fabricator === true
                      ? "Fabricator"
                      : "Recipient"}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item
                  key={`/users/${currentUser.id}`}
                  withDivider
                  onAction={setS}
                  icon={
                    <svg
                      data-name="Iconly/Curved/Profile"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                    >
                      <g
                        fill="none"
                        stroke="#7827c8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                      >
                        <path
                          data-name="Stroke 1"
                          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                        />
                        <path
                          data-name="Stroke 3"
                          d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
                        />
                      </g>
                    </svg>
                  }
                >
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item
                  key="logout"
                  withDivider
                  onAction={setS}
                  color="error"
                  icon={
                    <svg
                      data-name="Iconly/Curved/Lock"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="#f31761"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                      >
                        <path
                          data-name="Stroke 1"
                          d="M16.471 9.403V7.25a4.561 4.561 0 00-9.121-.016v2.169"
                        />
                        <path data-name="Stroke 3" d="M11.91 14.156v2.221" />
                        <path
                          data-name="Stroke 5"
                          d="M11.91 8.824c-5.745 0-7.66 1.568-7.66 6.271s1.915 6.272 7.66 6.272 7.661-1.568 7.661-6.272-1.921-6.271-7.661-6.271z"
                        />
                      </g>
                    </svg>
                  }
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {!currentUser && (
            <>
              <Navbar.Item>
                <Button
                  auto
                  flat
                  bordered
                  rounded
                  shadow
                  color="gradient"
                  onPress={handler1}
                >
                  Login
                </Button>
              </Navbar.Item>
              <Navbar.Item>
                <Button
                  auto
                  shadow
                  rounded
                  color="gradient"
                  onPress={() => setVisible(true)}
                >
                  Sign Up
                </Button>
              </Navbar.Item>
            </>
          )}
        </Navbar.Content>
      </Navbar>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible1}
        onClose={closeHandler1}
      >
        <Modal.Header>
          <Text id="modal-title" size={20}>
            Welcome to
            <br></br>
            <Text b size={24} color="secondary">
              Prints For A Purpose
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form
            // className="login-form"
            onSubmit={handleSubmit}
            aria-label="form"
          >
            {/* <h1>Login</h1> */}
            <Input
              type="text"
              bordered
              fullWidth
              color="primary"
              size="lg"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Username"
              aria-label="username"
              contentLeft={
                <svg width={24} height={24} viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="#7827c8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  >
                    <path d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3" />
                    <path d="M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22" />
                  </g>
                </svg>
              }
            />
            <Spacer y={0.75}></Spacer>
            <Input
              type="password"
              bordered
              fullWidth
              color="primary"
              size="lg"
              autoComplete="current-password"
              id="password"
              name="password"
              placeholder="Password"
              aria-label="password"
              contentLeft={
                <svg width={24} height={24} viewBox="0 0 24 24">
                  <g fill="#7827c8">
                    <path d="M18.75 8v2.1a12.984 12.984 0 00-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2a12.984 12.984 0 00-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8z" />
                    <path d="M18.75 10.1a12.984 12.984 0 00-1.5-.1H6.75a12.984 12.984 0 00-1.5.1C2.7 10.41 2 11.66 2 15v2c0 4 1 5 5 5h10c4 0 5-1 5-5v-2c0-3.34-.7-4.59-3.25-4.9zM8.71 16.71A1.052 1.052 0 018 17a1 1 0 01-.38-.08 1.032 1.032 0 01-.33-.21A1.052 1.052 0 017 16a1 1 0 01.08-.38 1.155 1.155 0 01.21-.33 1.032 1.032 0 01.33-.21 1 1 0 011.09.21 1.155 1.155 0 01.21.33A1 1 0 019 16a1.052 1.052 0 01-.29.71zm4.21-.33a1.155 1.155 0 01-.21.33A1.052 1.052 0 0112 17a1.033 1.033 0 01-.71-.29 1.155 1.155 0 01-.21-.33A1 1 0 0111 16a1.033 1.033 0 01.29-.71 1.047 1.047 0 011.42 0A1.033 1.033 0 0113 16a1 1 0 01-.08.38zm3.79.33a1.014 1.014 0 01-1.42 0 1.014 1.014 0 010-1.42 1.047 1.047 0 011.42 0c.04.05.08.1.12.16a.556.556 0 01.09.17.636.636 0 01.06.18 1.5 1.5 0 01.02.2 1.052 1.052 0 01-.29.71z" />
                  </g>
                </svg>
              }
            />
            <Spacer y={1}></Spacer>
            {/* //////////////////////////////////////////////////////////////// */}
            <Text size="$md">
              Don't have an account with us?{" "}
              <Link
                onClick={() => {
                  closeHandler1();
                  setVisible(true);
                  setChecked("");
                  setPassword("");
                  setUsername("");
                  setSelected(["3D Printing"]);
                }}
              >
                Sign up!
              </Link>
            </Text>
            <Spacer y={1}></Spacer>
            <Row justify="space-between">
              <Button auto flat shadow color="error" onPress={closeHandler1}>
                Close
              </Button>
              <Button
                auto
                type="submit"
                shadow
                flat
                color="secondary"
                onPress={closeHandler1}
              >
                Sign in
              </Button>
            </Row>
            <Spacer y={0.5}></Spacer>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        blur
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={20}>
            Sign Up For
            <br></br>
            <Text b size={24} color="secondary">
              Prints For A Purpose
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form
            className="signup-form"
            onSubmit={handleSubmit2}
            onChange={handleChange2}
            aria-label="form"
          >
            <Input
              type="text"
              bordered
              fullWidth
              color="primary"
              size="lg"
              id="username"
              name="username"
              autoComplete="off"
              placeholder="Username"
              aria-label="username"
              value={username}
              onChange={handleChange2}
              contentLeft={
                <svg width={24} height={24} viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="#7827c8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  >
                    <path d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3" />
                    <path d="M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22" />
                  </g>
                </svg>
              }
            />
            <Spacer y={0.75}></Spacer>
            <Input
              type="password"
              bordered
              fullWidth
              color="primary"
              size="lg"
              autoComplete="off"
              id="password"
              name="password"
              placeholder="Password"
              aria-label="password"
              onChange={handleChange2}
              value={password}
              contentLeft={
                <svg width={24} height={24} viewBox="0 0 24 24">
                  <g fill="#7827c8">
                    <path d="M18.75 8v2.1a12.984 12.984 0 00-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2a12.984 12.984 0 00-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8z" />
                    <path d="M18.75 10.1a12.984 12.984 0 00-1.5-.1H6.75a12.984 12.984 0 00-1.5.1C2.7 10.41 2 11.66 2 15v2c0 4 1 5 5 5h10c4 0 5-1 5-5v-2c0-3.34-.7-4.59-3.25-4.9zM8.71 16.71A1.052 1.052 0 018 17a1 1 0 01-.38-.08 1.032 1.032 0 01-.33-.21A1.052 1.052 0 017 16a1 1 0 01.08-.38 1.155 1.155 0 01.21-.33 1.032 1.032 0 01.33-.21 1 1 0 011.09.21 1.155 1.155 0 01.21.33A1 1 0 019 16a1.052 1.052 0 01-.29.71zm4.21-.33a1.155 1.155 0 01-.21.33A1.052 1.052 0 0112 17a1.033 1.033 0 01-.71-.29 1.155 1.155 0 01-.21-.33A1 1 0 0111 16a1.033 1.033 0 01.29-.71 1.047 1.047 0 011.42 0A1.033 1.033 0 0113 16a1 1 0 01-.08.38zm3.79.33a1.014 1.014 0 01-1.42 0 1.014 1.014 0 010-1.42 1.047 1.047 0 011.42 0c.04.05.08.1.12.16a.556.556 0 01.09.17.636.636 0 01.06.18 1.5 1.5 0 01.02.2 1.052 1.052 0 01-.29.71z" />
                  </g>
                </svg>
              }
            />
            <Spacer y={1}></Spacer>
            <Radio.Group
              label="Roles"
              value={checked}
              onChange={setChecked}
              orientation="horizontal"
            >
              <Radio value="recipient" color="secondary" labelColor="secondary">
                Recipient
              </Radio>
              <Radio value="fabricator" color="primary" labelColor="primary">
                Fabricator
              </Radio>
            </Radio.Group>
            <Spacer y={0.5}></Spacer>
            <ChooseYourSkills
              role={checked}
              selected={selected}
              setSelected={setSelected}
            ></ChooseYourSkills>
            <Spacer y={0.5}></Spacer>
            <Text size="$md">
              Already have an account with us?{" "}
              <Link
                onClick={() => {
                  setVisible(false);
                  handler1();
                  setChecked("");
                  setPassword("");
                  setUsername("");
                  setSelected(["3D Printing"]);
                }}
              >
                Log in!
              </Link>
            </Text>
            <Spacer y={0.75}></Spacer>

            <Row justify="space-between">
              <Button
                auto
                flat
                color="error"
                shadow
                onPress={() => setVisible(false)}
              >
                Close
              </Button>
              <Button
                auto
                flat
                type="submit"
                shadow
                onPress={() => setVisible(false)}
              >
                Create Account
              </Button>
            </Row>
            <Spacer y={0.5}></Spacer>
          </form>
        </Modal.Body>
      </Modal>
    </>
    
  );
}
