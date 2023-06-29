import { useState } from "react";
import {
  updateComment,
  deleteComment,
  getComments,
  getPrivateComments,
} from "../adapters/comments-adapter";
import {
  Textarea,
  Spacer,
  Button,
  Grid,
  Row,
  Modal,
  Text,
} from "@nextui-org/react";

export default function CommentDeleteEdit({
  currentUser,
  comment,
  setCommentContent,
  setComments,
  request_id,
  is_public,
}) {
  const [edit, setEdit] = useState(`${comment.content}`);
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const [visible2, setVisible2] = useState(false);
  const handler2 = () => setVisible2(true);
  const closeHandler2 = () => {
    setVisible2(false);
  };

  const handleChange = (event) => setEdit(event.target.value);

  const deleteCurrentComment = async () => {
    deleteComment(comment.id);
    if (is_public === true) {
      const allComments = await getComments(request_id, 1);
      setComments(allComments);
    } else {
      const allComments = await getPrivateComments(request_id, 1);
      setComments(allComments);
    }
    closeHandler();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData.entries());
    if (formData.content === comment.content) {
    } else {
      const [newComment] = await updateComment(formData);
      setCommentContent(newComment.content);
    }
  };

  return (
    <>
      <div>
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible2}
          onClose={closeHandler2}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Edit Your Comment
            </Text>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <Textarea
                css={{ display: "block" }}
                type="text"
                id="content"
                name="content"
                initialValue={edit}
                onChange={handleChange}
                required={true}
                status="secondary"
                maxLength="255"
                aria-label="Edited Comment"
              ></Textarea>
              <input type="hidden" name="id" value={comment.id} />
              <input type="hidden" name="user_id" value={currentUser.id} />
              <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler2}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  flat
                  color="secondary"
                  type="submit"
                  shadow
                  onPress={closeHandler2}
                >
                  Submit Changes
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Are you sure you want to delete{" "}
              <Text b size={18}>
                this comment?
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Cancel
            </Button>
            <Button auto flat color="secondary" onPress={deleteCurrentComment}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Row>
        <Grid.Container gap={0.5} css={{ paddingTop: "0px" }}>
          <Row justify="flex-end">
            <Button
              color="secondary"
              flat
              auto
              shadow
              onPress={handler2}
              iconRight={
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    fill="#7827c8"
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
              onPress={handler}
              icon={
                <svg
                  width={32}
                  height={32}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 6h11a1 1 0 011 1v10a1 1 0 01-1 1H8l-6-6 3-3m11 0l-3 3m0 0l-3 3m3-3l-3-3m3 3l3 3"
                    stroke="#7827c8"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            ></Button>
          </Row>
        </Grid.Container>
      </Row>
    </>
  );
}
