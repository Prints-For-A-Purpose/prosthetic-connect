const { isAuthorized } = require("../../utils/auth-utils");

const updateComment = async (req, res) => {
  const {
    session,
    db: { Comment },
    params: { id },
    body: { user_id, content },
  } = req;

  if (!isAuthorized(user_id, session)) return res.sendStatus(403);

  const comment = await Comment.find(id);
  if (!comment) return res.sendStatus(404);

  const updatedComment = await comment.update(content);
  res.send(updatedComment);
};

module.exports = updateComment;
