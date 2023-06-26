import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import CurrentUserContext from "../contexts/current-user-context";

import CommentBox from "../components/CommentBox";

import { getRequest } from "../adapters/request-adapter";
import { getComments, getPrivateComments } from "../adapters/comments-adapter";
import {
  isAnActiveFabricator,
  getActiveFabricators,
} from "../adapters/invites-adapter";
import { formatTimestamp } from "../utils";

import NewComment from "../components/NewComment";
import CommentPagination from "../components/CommentPagination";
import RequestInfo from "../components/RequestInfo";
import ProgressBar from "../components/ProgressBar";
import PendingInvites from "../components/PendingInvites";
import JoinRequest from "../components/JoinRequest";

export default function Request() {
  const { id } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [request, setRequest] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [username, setUsername] = useState(null);
  const [status, setStatus] = useState(null);
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(null);
  const [numOfActive, setNumOfActive] = useState(null);
  const [comments, setComments] = useState([]);

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
      setStatus(request.request_status);
    };
    loadRequest();
  }, [status, numOfActive]);

  useEffect(() => {
    const loadRequest = async () => {
      const [auth] = await isAnActiveFabricator(request.id);
      setActive(auth);
      const [counts] = await getActiveFabricators(id);
      setNumOfActive(counts.length);
      if (counts.length >= request.fabricators_needed) {
        setComplete(true);
      } else setComplete(false);
    };
    loadRequest();
  }, [request]);

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
      {currentUser && (authorized || active) && (
        <label className="switch">
          <input type="checkbox" onChange={handleToggle} checked={!is_public} />
          <span className="slider round" />
        </label>
      )}
      <h1>Request #{request.id}</h1>
      <h2>
        Requested By:
        <NavLink to={"/users/" + request.user_id}> {username}</NavLink>
      </h2>
      <p>{formatTimestamp(request.timestamp)}</p>
      <h3>Status: {request.request_status}</h3>
      <ProgressBar request={request}></ProgressBar>
      <RequestInfo
        request={request}
        currentUser={currentUser}
        setStatus={setStatus}
        setErrorText={setErrorText}
        complete={complete}
        numOfActive={numOfActive}
      ></RequestInfo>
      <PendingInvites
        setNumOfActive={setNumOfActive}
        numOfActive={numOfActive}
        active={active}
        request={request}
        authorized={authorized}
      ></PendingInvites>
      {canInvite && <JoinRequest request={request}></JoinRequest>}

      <div>
        <h3>Comments</h3>
        {comments.map((com) => (
          <div key={com.id} style={{ borderStyle: "dotted" }}>
            <CommentBox
              comment={com}
              setComments={setComments}
              request_id={request.id}
              is_public={is_public}
            />
          </div>
        ))}
        <CommentPagination
          id={id}
          setComments={setComments}
          request_id={request.id}
          is_public={is_public}
        />
        {currentUser && (
          <NewComment
            request={request}
            setComments={setComments}
            id={id}
            is_public={is_public}
          />
        )}
      </div>
    </>
  );
}
