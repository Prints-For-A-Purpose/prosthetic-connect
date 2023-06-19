import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import CommentDeleteEdit from "../components/CommentDeleteEdit";

export default function CommentBox({ comment }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [commentContent, setCommentContent] = useState(`${comment.content}`);

  return (
    <>
      {currentUser.id === comment.user_id ? (
        <>
          <p>
            <Link to={`/users/${comment.user_id}`}>{comment.username}</Link>
            {` at 
            ${comment.timestamp}: ${commentContent}`}
          </p>
          <CommentDeleteEdit
            currentUser={currentUser}
            comment={comment}
            setCommentContent={setCommentContent}
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
