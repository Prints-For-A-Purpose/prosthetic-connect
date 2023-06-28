import {
  NavLink,
  useNavigate,
  useParams,
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useContext, useMemo, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";

import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Input,
  Row,
  Button,
  Link,
  Spacer,
} from "@nextui-org/react";

import { logUserOut } from "../adapters/auth-adapter";
import { homePagination } from "../adapters/request-adapter";

export default function SiteHeadingAndNav() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const is_active = pathname.split("/")[1];
  const [s, setS] = useState([]);

  useEffect(() => {
    const load = async () => {
      if ([s][0].currentKey === "logout" || [s][0].anchorKey === "logout") {
        logUserOut();
        localStorage.clear();
        setCurrentUser(null);
        await homePagination(1);
        return navigate("/");
      } else if (
        [s][0].currentKey !== undefined ||
        [s][0].anchorKey !== undefined
      ) {
        return navigate(`${[s][0].anchorKey}`);
      }
    };
    load();
  }, [s]);

  return (
    <Navbar isBordered variant="floating">
      <Navbar.Brand css={{ mr: "$4" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="36"
          height="336"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="#000"
            strokeWidth={8}
          >
            <path d="M3825 4536 c-58 -27 -98 -67 -118 -116 -16 -39 -23 -75 -68 -365 -38 -246 -53 -343 -224 -1435 l-138 -875 -46 -41 c-38 -34 -50 -40 -72 -34 -68 20 -247 33 -367 27 -228 -12 -372 -52 -596 -166 -126 -65 -237 -103 -381 -130 -213 -41 -553 -55 -635 -26 -26 9 -79 15 -137 15 l-94 0 -15 35 c-7 19 -14 38 -14 43 0 4 24 20 54 34 67 33 107 83 114 143 9 81 -15 113 -167 232 -120 92 -140 104 -166 99 -65 -13 -266 -73 -276 -83 -27 -27 -228 -390 -224 -403 3 -8 55 -113 117 -234 95 -187 119 -227 168 -276 69 -69 158 -115 258 -132 64 -11 88 -9 234 14 l163 25 80 -19 c110 -26 429 -84 549 -99 89 -12 102 -16 145 -50 131 -104 309 -159 514 -159 216 0 367 45 515 154 56 42 74 49 182 71 66 14 170 43 232 64 62 21 150 43 196 49 210 29 365 176 408 386 12 58 250 857 399 1341 248 805 445 1477 445 1521 -1 90 -61 179 -151 222 -24 11 -193 59 -374 106 -373 97 -423 103 -510 62z m485 -176 c374 -98 400 -109 428 -182 12 -30 11 -43 -3 -93 l-17 -58 -35 42 c-73 87 -172 133 -288 133 -106 -1 -175 -30 -253 -109 l-64 -63 -139 131 c-148 141 -152 147 -125 214 18 41 71 72 131 74 11 0 175 -40 365 -89z m-400 -331 l128 -121 4 -81 c5 -125 58 -219 162 -292 l29 -21 -10 -129 c-9 -105 -8 -134 3 -151 7 -12 56 -46 108 -75 53 -30 96 -60 96 -68 0 -24 -103 -356 -114 -368 -7 -7 -63 -30 -127 -52 l-115 -38 -92 161 -92 161 40 255 c22 140 40 270 40 288 0 27 -22 63 -121 193 l-122 160 23 149 c13 83 25 150 28 150 2 0 61 -54 132 -121z m596 33 c86 -45 136 -126 135 -221 0 -99 -49 -177 -136 -217 -139 -65 -298 5 -341 151 -36 127 40 265 167 304 48 14 129 6 175 -17z m-656 -586 c0 -11 -18 -138 -41 -282 l-40 -261 105 -187 c58 -102 106 -190 106 -195 0 -8 -99 -336 -195 -647 l-35 -111 -52 18 c-58 20 -200 26 -256 10 -26 -8 -32 -7 -32 5 0 8 65 429 145 935 80 507 145 923 145 926 0 3 34 -39 75 -92 41 -54 75 -107 75 -119z m707 20 c-3 -7 -22 -69 -42 -137 -20 -68 -40 -128 -45 -132 -4 -5 -36 9 -71 30 l-63 38 2 60 c2 33 5 74 8 91 6 31 6 31 79 37 41 3 82 10 92 16 25 15 46 13 40 -3z m-291 -958 c-7 -24 -75 -250 -151 -502 -110 -363 -141 -455 -150 -441 -5 10 -31 44 -57 76 -27 32 -48 63 -48 68 0 18 231 766 239 774 4 4 45 20 92 36 46 16 85 30 86 30 1 1 -4 -18 -11 -41z m-3566 -772 c0 -113 -7 -119 -51 -39 -21 37 -39 73 -39 79 0 8 45 26 83 33 4 0 7 -32 7 -73z m213 -31 c79 -63 77 -95 -10 -139 -33 -16 -33 -16 -63 16 -31 35 -34 50 -24 135 8 60 6 61 97 -12z m-325 -163 c-3 -14 -17 -18 -86 -20 -45 -2 -82 1 -82 5 0 4 21 44 47 89 l47 82 39 -69 c21 -39 37 -78 35 -87z m3113 106 c70 -32 129 -90 165 -160 23 -43 28 -70 32 -145 4 -86 2 -96 -25 -155 -52 -109 -155 -188 -266 -204 l-47 -6 -75 156 -75 157 12 52 c14 67 58 112 119 120 66 9 92 63 49 102 -16 14 -30 17 -69 12 -64 -8 -101 -27 -150 -79 l-40 -41 -20 44 c-12 24 -21 49 -21 55 0 26 96 91 170 115 14 5 61 7 105 6 62 -2 93 -8 136 -29z m-657 -108 c39 -6 72 -12 74 -15 2 -2 -1 -20 -8 -39 -37 -114 -29 -248 22 -354 30 -64 109 -155 172 -199 l29 -20 -109 -27 c-85 -21 -109 -24 -113 -14 -9 28 -69 76 -106 87 -22 6 -61 11 -87 11 l-48 0 0 149 c0 82 -3 156 -6 165 -3 9 -36 25 -75 36 -37 11 -87 35 -111 53 -43 33 -105 134 -91 148 25 25 330 37 457 19z m-2287 -42 c5 -7 26 -51 46 -97 35 -79 36 -84 20 -97 -54 -42 -72 -54 -76 -47 -2 5 -17 55 -32 113 l-27 104 22 18 c26 21 34 22 47 6z m1736 -72 c38 -86 103 -151 195 -193 l72 -34 0 -113 0 -113 -46 -7 c-26 -3 -131 -6 -233 -6 l-186 0 0 113 c0 101 -3 118 -27 170 -15 32 -39 73 -54 90 l-26 31 79 40 c73 37 182 85 193 86 3 0 18 -29 33 -64z m826 -215 c51 -107 90 -195 88 -197 -2 -2 -25 10 -52 28 -77 51 -136 146 -150 242 -8 53 2 143 15 130 5 -5 49 -96 99 -203z m-2694 43 c21 -79 43 -148 49 -153 6 -5 112 -29 236 -54 171 -34 226 -48 228 -60 4 -18 -4 -21 -137 -42 -133 -22 -209 -16 -284 20 -88 43 -136 102 -221 274 -42 83 -76 154 -76 158 0 5 38 7 84 5 l84 -3 37 -145z m1485 19 c64 -72 91 -185 67 -274 -7 -26 -8 -27 -109 -31 -119 -4 -162 -22 -190 -78 -10 -19 -21 -35 -25 -35 -55 2 -455 72 -545 96 -33 9 -38 14 -51 62 -9 33 -13 79 -10 128 l5 75 58 -4 c151 -11 515 31 670 77 89 27 93 26 130 -16z m-980 -86 c0 -30 -2 -56 -5 -59 -7 -7 -260 47 -260 55 0 3 15 18 34 32 32 23 44 25 133 25 l98 0 0 -53z m1847 -351 c13 -13 -73 -83 -143 -117 -111 -53 -203 -72 -349 -72 -150 0 -239 20 -353 77 -77 39 -153 103 -135 114 16 10 970 9 980 -2z" />
            <path d="M4351 4011 c-13 -3 -33 -19 -45 -34 l-20 -27 21 -27 c18 -24 27 -28 66 -25 78 5 115 -55 60 -97 -32 -26 -59 -20 -91 20 -31 38 -75 40 -98 4 -21 -32 -6 -72 42 -115 42 -36 70 -44 135 -38 90 9 149 74 149 165 0 61 -15 95 -57 136 -43 41 -103 55 -162 38z" />
            <path d="M2156 3665 c-9 -9 -16 -25 -16 -36 0 -12 -7 -19 -19 -19 -26 0 -51 -26 -51 -54 0 -26 29 -56 53 -56 10 0 17 -8 17 -18 0 -28 34 -54 67 -50 20 2 32 12 43 35 8 18 23 33 32 33 10 0 25 12 35 26 15 24 15 29 2 53 -8 14 -24 27 -34 29 -11 2 -27 17 -35 35 -18 38 -66 49 -94 22z" />
            <path d="M2622 2478 c-5 -7 -12 -22 -14 -33 -2 -11 -12 -21 -23 -23 -32 -6 -45 -22 -45 -57 0 -35 13 -51 45 -57 11 -2 21 -12 23 -23 6 -32 22 -45 57 -45 35 0 51 13 57 45 2 11 12 21 23 23 33 7 45 22 45 59 0 29 -5 36 -31 47 -19 8 -37 26 -45 45 -11 26 -18 31 -47 31 -19 0 -39 -6 -45 -12z" />
            <path d="M1621 1934 c-12 -15 -21 -30 -21 -34 0 -4 -9 -10 -19 -13 -10 -2 -26 -16 -35 -30 -14 -20 -15 -29 -5 -51 7 -15 23 -29 35 -32 12 -3 28 -19 34 -35 7 -17 23 -32 36 -35 29 -7 74 19 74 44 0 9 15 24 33 32 27 13 32 20 32 50 0 30 -5 37 -32 50 -18 8 -33 23 -33 32 0 20 -37 48 -61 48 -10 0 -27 -12 -38 -26z" />
          </g>
        </svg>
        <Spacer x={0.5}></Spacer>
        <Text
          b
          css={{
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
          />
        </Navbar.Item>
        {currentUser && (
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="gradient"
                  size="lg"
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
                <Text b color="secondary" css={{ d: "flex" }}>
                  Recipient
                </Text>
                <Text b color="secondary" css={{ d: "flex" }}>
                  Signed in @{currentUser.username}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item
                key={`/users/${currentUser.id}`}
                withDivider
                onAction={setS}
              >
                My Profile
              </Dropdown.Item>
              <Dropdown.Item
                key="logout"
                withDivider
                onAction={setS}
                color="error"
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!currentUser && (
          <>
            <Navbar.Link color="secondary" href="/login">
              Login
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat color="secondary" as={Link} href="/sign-up">
                Sign Up
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  );
}
