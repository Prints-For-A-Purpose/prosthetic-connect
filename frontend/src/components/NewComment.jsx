import { useState } from "react";
import { createComment } from "../adapters/comments-adapter";
import { getComments, getPrivateComments } from "../adapters/comments-adapter";
import { Card, Textarea, Spacer, Button, Grid, Row } from "@nextui-org/react";

export default function NewComment({
  request,
  setComments,
  id,
  is_public,
  setN,
}) {
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
    setN(1);
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit} aria-label="form">
          <Row>
            <Textarea
              type="text"
              autoComplete="off"
              id="content"
              name="content"
              onChange={handleChange}
              value={content}
              required
              labelPlaceholder="New Comment"
              aria-label="submit"
              status="secondary"
              fullWidth="true"
              maxLength="255"
            ></Textarea>
            <Button
              type="submit"
              shadow
              color="secondary"
              size="lg"
              css={{ height: "5rem" }}
              auto
              aria-label="Submit"
            >
              Submit Comment
            </Button>
          </Row>
        </form>
      </Card>
    </>
  );
}
