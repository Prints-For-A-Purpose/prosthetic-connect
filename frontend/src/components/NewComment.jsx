import { useState } from "react";
import { createComment } from "../adapters/comments-adapter";
import { getComments, getPrivateComments } from "../adapters/comments-adapter";
import {
  Card,
  Textarea,
  Spacer,
  Button,
  Grid,
  Row,
  Input,
  Container,
} from "@nextui-org/react";

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
      <Container css={{ maxWidth: "50%" }}>
        <form onSubmit={handleSubmit} aria-label="form">
          <Row css={{ alignItems: "center" }}>
            <Input
              type="text"
              autoComplete="off"
              id="content"
              name="content"
              onChange={handleChange}
              value={content}
              required
              rounded
              labelPlaceholder={
                is_public
                  ? "Add a Public Comment ..."
                  : "Add a Private Comment..."
              }
              aria-label="submit"
              status="secondary"
              fullWidth="true"
              maxLength="255"
            ></Input>
            <Spacer x={1}></Spacer>
            <Button
              type="submit"
              rounded={true}
              shadow
              color="gradient"
              size="lg"
              auto
              aria-label="Submit"
            >
              Join Discussion
            </Button>
          </Row>
        </form>
      </Container>
    </>
  );
}
