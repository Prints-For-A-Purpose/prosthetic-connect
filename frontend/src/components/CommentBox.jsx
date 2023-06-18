import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function CommentBox({ comment }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div style={{ borderStyle: "dotted" }}>
      <p>
        {currentUser && currentUser.id === comment.user_id ? (
          <>
            <p>
              <Link to={`/users/${comment.user_id}`}>{comment.username}</Link>{" "}
              at {comment.timestamp}: {comment.content}
            </p>
            <button>Delete</button>
            <button>Edit</button>
          </>
        ) : (
          <p>
            <Link to={`/users/${comment.user_id}`}>{comment.username}</Link> at
            {comment.timestamp}: {comment.content}
          </p>
        )}
      </p>
    </div>
  );
}
