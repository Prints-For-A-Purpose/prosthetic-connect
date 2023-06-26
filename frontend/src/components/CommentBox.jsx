import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import CommentDeleteEdit from "../components/CommentDeleteEdit";
import { formatTimestamp } from "../utils";

export default function CommentBox({
  comment,
  setComments,
  request_id,
  is_public,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [commentContent, setCommentContent] = useState(`${comment.content}`);

  return (
    <>
      {currentUser && currentUser.id === comment.user_id ? (
        <>
          {" "}
          {console.log(comment)}
          {comment.pfp_url && (
            <img
              src={comment.pfp_url}
              style={{ borderRadius: "100%", maxWidth: "3%" }}
            ></img>
          )}
          <p>
            <Link to={`/users/${comment.user_id}`}>{comment.username}</Link>
            {` at 
            ${formatTimestamp(comment.timestamp)}: ${commentContent}`}
          </p>
          <CommentDeleteEdit
            currentUser={currentUser}
            comment={comment}
            setCommentContent={setCommentContent}
            setComments={setComments}
            request_id={request_id}
            is_public={is_public}
          ></CommentDeleteEdit>
        </>
      ) : (
        <p>
          <Link to={`/users/${comment.user_id}`}>{comment.username}</Link>
          {` at 
            ${comment.timestamp}: ${commentContent}`}
        </p>
      )}
    </>
  );
}
