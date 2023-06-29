import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import CommentDeleteEdit from "../components/CommentDeleteEdit";
import { formatTimestamp } from "../utils";
import { Card, Text, User, Row, Badge, Spacer } from "@nextui-org/react";

export default function CommentBox({
  comment,
  setComments,
  request_id,
  is_public,
  user_id,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [commentContent, setCommentContent] = useState(`${comment.content}`);
  const navigate = useNavigate();

  return (
    <>
      <Card
        isHoverable
        isPressable
        variant="bordered"
        onPress={() => navigate("/users/" + comment.user_id)}
      >
        <Card.Header>
          <Row>
            <User
              name={formatTimestamp(comment.timestamp)}
              src={comment.pfp_url}
              color="gradient"
              bordered
              zoomed
            >
              <User.Link href={"/users/" + comment.user_id}>
                @{comment.username}
              </User.Link>
            </User>
            <Spacer x={1}></Spacer>
            <Row>
              <Badge
                enableShadow
                css={
                  comment.user_id === user_id
                    ? {
                        "--nextui--badgeBackgroundColor":
                          "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
                        "--nextui--badgeTextColor":
                          "var(--nextui-colors-neutralSolidContrast)",
                        "--nextui--badgeShadowColor":
                          "var(--nextui-colors-secondaryShadow)",
                      }
                    : comment.is_fabricator === false
                    ? {
                        "--nextui--badgeBackgroundColor":
                          "var(--nextui-colors-secondary)",
                        "--nextui--badgeTextColor":
                          "var(--nextui-colors-secondarySolidContrast)",
                        "--nextui--badgeShadowColor":
                          "var(--nextui-colors-secondaryShadow)",
                      }
                    : {
                        "--nextui--badgeBackgroundColor":
                          "var(--nextui-colors-primary)",
                        "--nextui--badgeTextColor":
                          "var(--nextui-colors-primarySolidContrast)",
                        "--nextui--badgeShadowColor":
                          "var(--nextui-colors-primaryShadow)",
                      }
                }
              >
                {comment.is_fabricator ? "Fabricator" : "Recipient"}
              </Badge>
              <Spacer x={1}></Spacer>
              <Text css={{ overflowWrap: "true" }}>{commentContent}</Text>
            </Row>
          </Row>
          {currentUser && currentUser.id === comment.user_id && (
            <CommentDeleteEdit
              currentUser={currentUser}
              comment={comment}
              setCommentContent={setCommentContent}
              setComments={setComments}
              request_id={request_id}
              is_public={is_public}
            ></CommentDeleteEdit>
          )}
        </Card.Header>
        <Spacer y={2}></Spacer>
      </Card>
      <Spacer y={2}></Spacer>
    </>
  );
}
