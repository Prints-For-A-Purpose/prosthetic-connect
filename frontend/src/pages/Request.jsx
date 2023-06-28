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

export default function Request() {
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
                <Badge variant="flat" color="secondary" enableShadow>
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
              {console.log(request)}
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
                bgBlur: "#ffffff66", // bgBlur: "#0f111466",
                borderTop:
                  "$borderWeights$light solid rgba(255, 255, 255, 0.2)", // borderTop: "$borderWeights$light solid $gray800",
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
              >
                <User.Link href={"/users/" + request.user_id}>
                  @{username}
                </User.Link>
              </User>
              {/* <Spacer y={3}></Spacer> */}
              <ProgressBar request={request} size={"xl"} />
              {/* <Spacer y={3}></Spacer> */}
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
      <RequestInfo
        request={request}
        currentUser={currentUser}
        setStatus={setStatus}
        setErrorText={setErrorText}
        complete={complete}
        numOfActive={numOfActive}
      ></RequestInfo>
      <Spacer y={2} />
      <Row>
        <Spacer x={4} />
        <PendingInvites
          setNumOfActive={setNumOfActive}
          numOfActive={numOfActive}
          active={active}
          request={request}
          authorized={authorized}
        ></PendingInvites>
        <Spacer x={4} />
      </Row>
      <Row>{canInvite && <JoinRequest request={request}></JoinRequest>}</Row>
      <Spacer y={2} />
      <Row>
        <Spacer x={4} />
        <Card>
          <Spacer y={2} />
          <Row css={{ justifyContent: "center" }}>
            {!(authorized || active) ? (
              <h3>Comments</h3>
            ) : currentUser && (authorized || active) && is_public === true ? (
              <h3>Public Comments</h3>
            ) : (
              <h3>Private Comments</h3>
            )}
            <Spacer x={1} />
            {currentUser && (authorized || active) && (
              <Switch
                bordered
                size="xl"
                color="secondary"
                onChange={handleToggle}
                checked={!is_public}
              ></Switch>
            )}
          </Row>
          <Spacer y={2} />
          <Row css={{ justifyContent: "center" }}>
            {currentUser && (
              <NewComment
                request={request}
                setComments={setComments}
                id={id}
                is_public={is_public}
                setN={setN}
              />
            )}
          </Row>
          <Spacer y={2} />
          {comments.map((com) => (
            <Row>
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
        </Card>
        <Spacer x={4} />
      </Row>
      <Spacer y={4} />
    </>
  );
}
