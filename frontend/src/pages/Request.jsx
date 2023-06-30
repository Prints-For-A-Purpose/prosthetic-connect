import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  User,
  Switch,
  Pagination,
  Card,
  Spacer,
  Row,
  Badge,
  Grid,
  Col,
  Text,
  Container,
} from "@nextui-org/react";

import CurrentUserContext from "../contexts/current-user-context";

import CommentBox from "../components/CommentBox";

import { getUser } from "../adapters/user-adapter";
import { getRequest } from "../adapters/request-adapter";
import { getComments, getPrivateComments } from "../adapters/comments-adapter";
import {
  isAnActiveFabricator,
  getActiveFabricators,
} from "../adapters/invites-adapter";
import { formatTimestamp } from "../utils";

import NewComment from "../components/NewComment";
import RequestInfo from "../components/RequestInfo";
import ProgressBar from "../components/ProgressBar";
import PendingInvites from "../components/PendingInvites";
import JoinRequest from "../components/JoinRequest";

export default function Request(isDark) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  const [request, setRequest] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [username, setUsername] = useState(null);
  const [status, setStatus] = useState(null);
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(null);
  const [userProfile, setUserProfile] = useState(1);
  const [numOfActive, setNumOfActive] = useState(null);
  const [comments, setComments] = useState([]);
  const [n, setN] = useState(1);
  const [c, setC] = useState(1);

  const [is_public, setIs_Public] = useState(null);

  useEffect(() => {
    const isPublic =
      localStorage.getItem(`isPublic${id}`) === null
        ? true
        : localStorage.getItem(`isPublic${id}`) === "false"
        ? false
        : true;

    const fetchComments = async () => {
      if (isPublic === true) {
        setIs_Public(true);
        const allComments = await getComments(id, 1);
        setComments(allComments);
      } else {
        setIs_Public(false);
        const allComments = await getPrivateComments(id, 1);
        setComments(allComments);
      }
    };
    fetchComments();
  }, []);

  const handleToggle = async () => {
    const updatedCondition = !is_public;
    setIs_Public(updatedCondition);
    localStorage.setItem(`isPublic${id}`, updatedCondition.toString());
    if (updatedCondition === true) {
      const allComments = await getComments(id, 1);
      setComments(allComments);
    } else {
      const allComments = await getPrivateComments(id, 1);
      setComments(allComments);
    }
  };

  useEffect(() => {
    const loadRequest = async () => {
      const [data, error] = await getRequest(id);
      if (error) return setErrorText(error.statusText);
      setRequest(data);
      setUsername(data.username);
      setStatus(data.request_status);
      const [user] = await getUser(data.user_id);
      setUserProfile(user);
    };
    loadRequest();
  }, [id, status, numOfActive]);

  useEffect(() => {
    const loadRequest = async () => {
      const [auth] = await isAnActiveFabricator(id);
      setActive(auth);
      const [counts] = await getActiveFabricators(id);
      setNumOfActive(counts.length);
      if (counts.length >= request.fabricators_needed) {
        setComplete(true);
      } else setComplete(false);
    };
    loadRequest();
  }, [request, c]);

  const percentages = {
    Archived: 0,
    Pending: 5,
    Planning: 10,
    Design: 30,
    Development: 50,
    Testing: 70,
    Review: 80,
    Iteration: 90,
    Documentation: 95,
    Deployment: 100,
  };

  if (!request && !errorText && !username) return null;
  if (errorText) return <p>{errorText}</p>;

  const authorized = currentUser && +currentUser.id === +request.user_id;

  const canInvite =
    currentUser &&
    !active &&
    currentUser.is_fabricator &&
    request.request_status === "Pending"
      ? true
      : false;
  return (
    <>
      <Spacer y={1}></Spacer>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={10}>
          <Card
            css={{ w: "100%", h: "700px" }}
            isHoverable
            isPressable
            onPress={() => navigate("/users/" + request.user_id)}
          >
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Badge variant="flat" color="secondary" enableShadow size="xl">
                  Requested {formatTimestamp(request.timestamp)}
                </Badge>
                <Text
                  size={30}
                  weight="bold"
                  transform="uppercase"
                  color="Black"
                >
                  {percentages[request.request_status]}% Complete
                </Text>
                <Text h1 color="white">
                  {request.request_status}
                  {request.request_status === "Archived" ||
                  request.request_status === "Pending"
                    ? ""
                    : request.request_status === "Design"
                    ? "ing Phase"
                    : request.request_status === "Review"
                    ? "al Phase"
                    : request.request_status === "Deployment"
                    ? "!"
                    : " Phase"}
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={request.image_url}
                objectFit="cover"
                width="100%"
                height="100%"
                alt="Default Per Category"
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop:
                  "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <User
                name="Recipient"
                src={userProfile.pfp_url}
                size="xl"
                color="gradient"
                bordered
                zoomed
              >
                <User.Link size="$lg" href={"/users/" + request.user_id}>
                  @{username}
                </User.Link>
              </User>
              <ProgressBar request={request} size={"xl"} />
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={1.5}></Spacer>
      <RequestInfo
        request={request}
        currentUser={currentUser}
        setStatus={setStatus}
        setErrorText={setErrorText}
        complete={complete}
        numOfActive={numOfActive}
      ></RequestInfo>
      <Spacer y={1.5}></Spacer>
      <PendingInvites
        setNumOfActive={setNumOfActive}
        numOfActive={numOfActive}
        active={active}
        request={request}
        authorized={authorized}
      ></PendingInvites>
      <Container css={{ maxWidth: "50%" }}>
        {canInvite && <JoinRequest request={request}></JoinRequest>}
      </Container>
      <Spacer y={1} />
      <Row>
        <Container>
          <Row css={{ justifyContent: "center", alignItems: "center" }}>
            {!(authorized || active) ? (
              <Text
                h2
                css={{
                  textGradient: "45deg, $purple600 -20%, $pink600 100%",
                }}
              >
                Join the Discussion
              </Text>
            ) : currentUser && (authorized || active) && is_public === true ? (
              <Text
                h2
                css={{
                  textGradient: "45deg, $purple600 -20%, $pink600 100%",
                }}
              >
                Public Discussion
              </Text>
            ) : (
              <Text
                h2
                css={{
                  textGradient: "45deg, $purple600 -20%, $pink600 100%",
                }}
              >
                Private Discussion
              </Text>
            )}
            <Spacer x={1} />
            {currentUser && (authorized || active) && (
              <Switch
                bordered
                size="xl"
                color="secondary"
                shadow
                onChange={handleToggle}
                checked={!is_public}
                iconOn={
                  <svg
                    width={36}
                    height={36}
                    fill="#7827c8"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#7827c8"
                    strokeWidth={1.472}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit={2}
                  >
                    <path fill="none" d="M-960 -256H320V544H-960z" />
                    <path d="M13.673 10.345l-3.097 3.096 39.853 39.854 3.097-3.097-39.853-39.853z" />
                    <path
                      d="M17.119 19.984l2.915 2.915c-3.191 2.717-5.732 6.099-7.374 9.058l-.005.01c4.573 7.646 11.829 14.872 20.987 13.776 2.472-.296 4.778-1.141 6.885-2.35l2.951 2.95c-4.107 2.636-8.815 4.032-13.916 3.342-9.198-1.244-16.719-8.788-21.46-17.648 2.226-4.479 5.271-8.764 9.017-12.053zm6.63-4.32c2.572-1.146 5.355-1.82 8.327-1.868.165-.001 2.124.092 3.012.238a18.45 18.45 0 011.659.35C45.472 16.657 51.936 24.438 56 32.037c-1.705 3.443-3.938 6.398-6.601 9.277l-2.827-2.827c1.967-2.12 3.622-4.161 4.885-6.45 0 0-1.285-2.361-2.248-3.643a37.988 37.988 0 00-1.954-2.395c-.54-.608-2.637-2.673-3.136-3.103-3.348-2.879-7.279-5.138-11.994-5.1-1.826.029-3.582.389-5.249.995l-3.127-3.127z"
                      fillRule="nonzero"
                    />
                    <path d="M25.054 27.92l2.399 2.398a4.843 4.843 0 006.114 6.114l2.399 2.399A8.02 8.02 0 0125.054 27.92zm6.849-4.101l.148-.002a8.021 8.021 0 018.017 8.017l-.001.148-8.164-8.163z" />
                  </svg>
                }
                iconOff={
                  <svg
                    width={36}
                    height={36}
                    fill="#7827c8"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#7827c8"
                    strokeWidth={2.56}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit={2}
                  >
                    <path fill="none" d="M-896 -256H384V544H-896z" />
                    <path d="M32.513 13.926C43.087 14.076 51.654 23.82 56 32c0 0-1.422 2.892-2.856 4.895a46.344 46.344 0 01-2.191 2.826 41.265 41.265 0 01-1.698 1.898c-5.237 5.5-12.758 9.603-20.7 8.01C19.732 47.859 12.823 40.131 8.497 32c0 0 1.248-2.964 2.69-4.964a45.105 45.105 0 012.034-2.617 41.618 41.618 0 011.691-1.897c4.627-4.876 10.564-8.63 17.601-8.596zm-.037 4c-5.89-.022-10.788 3.267-14.663 7.35a37.553 37.553 0 00-1.527 1.713 41.472 41.472 0 00-1.854 2.386c-.544.755-1.057 1.805-1.451 2.59 3.773 6.468 9.286 12.323 16.361 13.742 6.563 1.317 12.688-2.301 17.016-6.846a37.224 37.224 0 001.534-1.715c.7-.833 1.366-1.694 1.999-2.579.557-.778 1.144-1.767 1.588-2.567-3.943-6.657-10.651-13.944-19.003-14.074z" />
                    <path d="M32.158 23.948c4.425 0 8.018 3.593 8.018 8.017a8.021 8.021 0 01-8.018 8.017 8.021 8.021 0 01-8.017-8.017 8.022 8.022 0 018.017-8.017zm0 4.009a4.01 4.01 0 014.009 4.008 4.01 4.01 0 01-4.009 4.009 4.01 4.01 0 01-4.008-4.009 4.01 4.01 0 014.008-4.008z" />
                  </svg>
                }
              ></Switch>
            )}
          </Row>
          {currentUser && (
            <>
              <Spacer y={2} />
              <NewComment
                request={request}
                setComments={setComments}
                id={id}
                is_public={is_public}
                setN={setN}
              />
            </>
          )}
          <Spacer y={2} />
          {comments.map((com) => (
            <Row css={{ justifyContent: "center" }}>
              <CommentBox
                user_id={request.user_id}
                key={com.id}
                comment={com}
                setComments={setComments}
                request_id={request.id}
                is_public={is_public}
              />
            </Row>
          ))}
          <Spacer y={2} />
          <Row css={{ justifyContent: "center" }}>
            <Pagination
              total={20}
              initialPage={n}
              color="secondary"
              size="xl"
              shadow
              onChange={async (page) => {
                if (is_public === true) {
                  const newComments = await getComments(id, page);
                  setComments(newComments);
                } else {
                  const newComments = await getPrivateComments(id, page);
                  setComments(newComments);
                }
                setN(n + 1);
              }}
              siblings={2}
            />
          </Row>
          <Spacer y={2} />
        </Container>
      </Row>
      <Spacer y={2} />
    </>
  );
}
