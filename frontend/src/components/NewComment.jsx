import { useState } from "react";
import { createComment } from "../adapters/comments-adapter";
import { getComments, getPrivateComments } from "../adapters/comments-adapter";

export default function NewComment({ request, setComments, id, is_public }) {
  const [content, setContent] = useState("");
  const [errorText, setErrorText] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "content") setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const request_id = request.id;
    if (!content) return setErrorText("Missing comment content.");
    await createComment({
      request_id,
      content,
      is_public,
    });
    if (is_public === true) {
      const allComments = await getComments(id, 1);
      setComments(allComments);
    } else {
      const allComments = await getPrivateComments(id, 1);
      setComments(allComments);
    }

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="content">New Comment</label>
      <textarea
        type="text"
        autoComplete="off"
        id="content"
        name="content"
        onChange={handleChange}
        value={content}
        required
      ></textarea>
      <button>Submit Comment</button>
    </form>
  );
}
