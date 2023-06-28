import { useState } from "react";
import {
  updateComment,
  deleteComment,
  getComments,
  getPrivateComments,
} from "../adapters/comments-adapter";
import { Card, Textarea, Spacer, Button, Grid, Row } from "@nextui-org/react";

export default function NewCommentDeleteEdit({
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
    <form onSubmit={handleSubmit}>
      <Row>
        <Grid.Container gap={0.5} css={{ paddingTop: "0px" }}>
          <Row justify="flex-end">
            <div>
              <Textarea
                style={formVisibility}
                css={{ mw: "80%" }}
                type="text"
                id="content"
                name="content"
                initialValue={edit}
                onChange={handleChange}
                required
                status="secondary"
                maxLength="255"
              ></Textarea>
              <input type="hidden" name="id" value={comment.id} />
              <input type="hidden" name="user_id" value={currentUser.id} />
              <Button
                size="sm"
                flat
                color="secondary"
                type="submit"
                shadow
                style={formVisibility}
              >
                Submit Edit
              </Button>
            </div>
            <Spacer x={1} />
            <Button
              color="secondary"
              flat
              auto
              shadow
              onClick={showForm}
              style={buttonVisibility}
              iconRight={
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M15.198 3.52a1.612 1.612 0 012.223 2.336L6.346 16.421l-2.854.375 1.17-3.272L15.197 3.521zm3.725-1.322a3.612 3.612 0 00-5.102-.128L3.11 12.238a1 1 0 00-.253.388l-1.8 5.037a1 1 0 001.072 1.328l4.8-.63a1 1 0 00.56-.267L18.8 7.304a3.612 3.612 0 00.122-5.106zM12 17a1 1 0 100 2h6a1 1 0 100-2h-6z"
                  />
                </svg>
              }
            ></Button>
            <Spacer x={1} />
            <Button
              auto
              color="secondary"
              flat
              shadow
              onClick={deleteCurrentComment}
              icon={
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 6h11a1 1 0 011 1v10a1 1 0 01-1 1H8l-6-6 3-3m11 0l-3 3m0 0l-3 3m3-3l-3-3m3 3l3 3"
                    stroke="#000"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            ></Button>
          </Row>
        </Grid.Container>
      </Row>
    </form>
  );
}
