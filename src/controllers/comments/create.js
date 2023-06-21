const createComment = async (req, res) => {
  const {
    session,
    db: { Comment },
    body: { request_id, content, is_public },
  } = req;

  if (!session.userId) return res.sendStatus(401);
  const comment = await Comment.createComment(
    request_id,
    session.userId,
    content,
    is_public
  );

  res.send(comment);
};

module.exports = createComment;
