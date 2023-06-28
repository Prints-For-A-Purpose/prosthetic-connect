import { useState } from "react";
import {
  updateComment,
  deleteComment,
  getComments,
  getPrivateComments,
} from "../adapters/comments-adapter";

export default function CommentDeleteEdit({
  currentUser,
  comment,
  setCommentContent,
  setComments,
  request_id,
  is_public,
}) {
  const [edit, setEdit] = useState(`${comment.content}`);
  const [formVisibility, setFormVisibility] = useState({ display: "none" });
  const [buttonVisibility, setButtonVisibility] = useState({
    display: "inline-block",
  });

  const handleChange = (event) => setEdit(event.target.value);

  const showForm = () => {
    setFormVisibility({ display: "block" });
    setButtonVisibility({
      display: "none",
    });
  };

  const deleteCurrentComment = async () => {
    deleteComment(comment.id);
    if (is_public === true) {
      const allComments = await getComments(request_id, 1);
      setComments(allComments);
    } else {
      const allComments = await getPrivateComments(request_id, 1);
      setComments(allComments);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData.entries());
    if (formData.content === comment.content) {
      setFormVisibility({ display: "none" });
      setButtonVisibility({
        display: "inline-block",
      });
    } else {
      const [newComment] = await updateComment(formData);
      setFormVisibility({ display: "none" });
      setButtonVisibility({
        display: "inline-block",
      });
      setCommentContent(newComment.content);
    }
  };

  return (
    <>
      <button onClick={deleteCurrentComment}>Delete</button>
      <button onClick={showForm} style={buttonVisibility}>
        Edit
      </button>
      <form onSubmit={handleSubmit} style={formVisibility} aria-label="form">
        <label htmlFor="content">Edit Comment</label>
        <textarea
          type="text"
          id="content"
          name="content"
          value={edit}
          onChange={handleChange}
          required
        />
        <input type="hidden" name="id" value={comment.id} />
        <input type="hidden" name="user_id" value={currentUser.id} />

        <button>Submit Edit</button>
      </form>
    </>
  );
}
