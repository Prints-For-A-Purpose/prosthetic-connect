import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import CommentDeleteEdit from "../components/CommentDeleteEdit";
import { formatTimestamp } from "../utils"


export default function CommentBox({ comment, setComments, request_id }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [commentContent, setCommentContent] = useState(`${comment.content}`);


  return (
    <>
      {currentUser && currentUser.id === comment.user_id ? (
        <>
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
