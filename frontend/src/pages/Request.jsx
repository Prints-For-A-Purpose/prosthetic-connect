import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import CurrentUserContext from "../contexts/current-user-context";

import CommentBox from "../components/CommentBox";

import { getRequest } from "../adapters/request-adapter";
import { getUser } from "../adapters/user-adapter";
import { getComments } from "../adapters/comments-adapter";
import { createComment } from "../adapters/comments-adapter";

export default function Request() {
  const { currentUser } = useContext(CurrentUserContext);
  const [request, setRequest] = useState(null);
  const [username, setUsername] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadRequest = async () => {
      const [data, error] = await getRequest(id);
      if (error) return setErrorText(error.statusText);
      setRequest(data);
      const allComments = await getComments(id);
      setComments(allComments);
      const user = await getUser(data.user_id);
      const [{ username }] = user;
      setUsername(username);
    };
    loadRequest();
  }, [id]);

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
    const [newComment, error] = await createComment({
      request_id,
      content,
      is_public,
    });
    if (error) return setErrorText(error.statusText);
    const allComments = await getComments(id);
    setContent("");
    setComments(allComments);
  };

  if (!request && !errorText && !username) return null;
  if (errorText) return <p>{errorText}</p>;

  return (
    <>
      <h1>Request #{request.id}</h1>
      <h2>
        Requested By:{" "}
        <NavLink to={"/users/" + request.user_id}> {username}</NavLink>
      </h2>
      <p>{request.timestamp}</p>
      <h3>Status: {request.request_status}</h3>
      <div>
        <h4>
          Can you provide a description of your specific disability, condition,
          or need for which the 3D-printed item is required?
        </h4>
        <p>{request.q1_disability_info}</p>
        <h4>
          What are the desired functionalities or features you would like the
          3D-printed item to have?
        </h4>
        <p>{request.q2_functional_requirements}</p>
        <h4>
          What measurements or specifications are needed to ensure a comfortable
          and secure fit of the 3D-printed item?
        </h4>
        <p>{request.q3_physical_specifications}</p>
        <h4>
          Could you provide relevant details about your daily routine,
          lifestyle, or specific use cases for the 3D-printed item?
        </h4>
        <p>{request.q4_lifestyle_usage}</p>
        <h4>
          Do you have any other specific requests, concerns, or preferences that
          would help us create a tailored and suitable 3D-printed item for you?
        </h4>
        <p>{request.q5_additional || "N/A"}</p>
      </div>
      <div>
        <h3>Comments</h3>
        {comments.map((com) => (
          <div key={com.id} style={{ borderStyle: "dotted" }} id={com.id}>
            <CommentBox
              comment={com}
              setComments={setComments}
              request_id={request.id}
            />
          </div>
        ))}
        {currentUser && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="content">new comment</label>
            <input
              type="text"
              autoComplete="off"
              id="content"
              name="content"
              onChange={handleChange}
              value={content}
              required
            ></input>
            <button>Submit Comment</button>
          </form>
        )}
      </div>
    </>
  );
}
