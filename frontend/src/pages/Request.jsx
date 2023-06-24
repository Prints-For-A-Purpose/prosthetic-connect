import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import CurrentUserContext from "../contexts/current-user-context";

import CommentBox from "../components/CommentBox";

import { getRequest } from "../adapters/request-adapter";
import { getComments } from "../adapters/comments-adapter";
import { formatTimestamp } from "../utils";

import NewComment from "../components/NewComment";
import CommentPagination from "../components/CommentPagination";
import RequestInfo from "../components/RequestInfo";
import ProgressBar from "../components/ProgressBar";
import PendingInvites from "../components/PendingInvites";

export default function Request() {
  const { id } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [request, setRequest] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [username, setUsername] = useState(null);
  const [status, setStatus] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadRequest = async () => {
      const [data, error] = await getRequest(id);
      if (error) return setErrorText(error.statusText);
      setRequest(data);
      setUsername(data.username);
      setStatus(request.request_status);
      const allComments = await getComments(id, 1);
      setComments(allComments);
    };
    loadRequest();
  }, [status]);

  if (!request && !errorText && !username) return null;
  if (errorText) return <p>{errorText}</p>;

  const authorized = currentUser && +currentUser.id === +request.user_id;

  return (
    <>
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
      ></RequestInfo>
      {authorized && <PendingInvites request={request}></PendingInvites>}

      <div>
        <h3>Comments</h3>
        {comments.map((com) => (
          <div key={com.id} style={{ borderStyle: "dotted" }}>
            <CommentBox
              comment={com}
              setComments={setComments}
              request_id={request.id}
            />
          </div>
        ))}
        <CommentPagination
          id={id}
          setComments={setComments}
          request_id={request.id}
        />
        {currentUser && (
          <NewComment request={request} setComments={setComments} id={id} />
        )}
      </div>
    </>
  );
}
