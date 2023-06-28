import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import {
  User,
  Switch,
  Pagination,
  Card,
  Spacer,
  Row,
  Avatar,
} from "@nextui-org/react";

import CurrentUserContext from "../contexts/current-user-context";

import NewCommentBox from "../components/NewCommentBox";

import { getUser } from "../adapters/user-adapter";
import { getRequest } from "../adapters/request-adapter";
import { getComments, getPrivateComments } from "../adapters/comments-adapter";
import {
  isAnActiveFabricator,
  getActiveFabricators,
} from "../adapters/invites-adapter";
import { formatTimestamp } from "../utils";

import NewNewComment from "../components/NewNewComment";
import NewRequestInfo from "../components/NewRequestInfo";
import NewProgressBar from "../components/NewProgressBar";
import NewPendingInvites from "../components/NewPendingInvites";
import NewJoinRequest from "../components/NewJoinRequest";

export default function NewRequest() {
  const { id } = useParams();
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
  }, [request]);

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
      <br></br>
      <User
        name="Recipient"
        src={userProfile.pfp_url}
        size="xl"
        color="gradient"
        bordered
      >
        <User.Link href={"/users/" + request.user_id}>@{username}</User.Link>
      </User>
      <br></br>
      <p>Requested {formatTimestamp(request.timestamp)}</p>
      <Row css={{ justifyContent: "center" }}>
        <h3>
          Phase: {request.request_status} -{" "}
          {percentages[request.request_status]}% Complete
        </h3>
      </Row>
      <Row>
        <Spacer x={4} />
        <NewProgressBar request={request} size={"xl"} />
        <Spacer x={4} />
      </Row>
      <Spacer y={2} />
      <NewRequestInfo
        request={request}
        currentUser={currentUser}
        setStatus={setStatus}
        setErrorText={setErrorText}
        complete={complete}
        numOfActive={numOfActive}
      ></NewRequestInfo>
      <Spacer y={2} />
      <Row>
        <Spacer x={4} />
        <NewPendingInvites
          setNumOfActive={setNumOfActive}
          numOfActive={numOfActive}
          active={active}
          request={request}
          authorized={authorized}
        ></NewPendingInvites>
        <Spacer x={4} />
      </Row>
      <Row>
        {canInvite && <NewJoinRequest request={request}></NewJoinRequest>}
      </Row>
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
              <NewNewComment
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
              <NewCommentBox
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
