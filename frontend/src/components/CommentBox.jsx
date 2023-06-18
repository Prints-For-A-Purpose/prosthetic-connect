import { Link } from "react-router-dom";

export default function CommentBox({ comment }) {
  return (
    <div style={{ borderStyle: "dotted" }}>
      <p>
        <Link to={`/users/${comment.user_id}`}>{comment.username}</Link>
        {` at ${comment.timestamp}: ${comment.content}`}
      </p>
    </div>
  );
}
