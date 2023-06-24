import { useState } from "react";
import { createComment } from "../adapters/comments-adapter";
import { getComments } from "../adapters/comments-adapter";

export default function NewComment({ request, setComments, id }) {
  const [content, setContent] = useState("");
  const [errorText, setErrorText] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "content") setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const is_public = true;
    const request_id = request.id;
    if (!content) return setErrorText("Missing comment content.");
    await createComment({
      request_id,
      content,
      is_public,
    });
    if (error) return setErrorText(error.statusText);
    const allComments = await getComments(id, 1);
    setContent("");
    setComments(allComments);
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
