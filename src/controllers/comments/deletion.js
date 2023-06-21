const deleteComment = async (req, res) => {
  const {
    session,
    db: { Comment },
    params: { id },
  } = req;

  if (!session.userId) {
    return res.sendStatus(401);
  }

  const deleteComment = await Comment.deleteComment(id);
  if (deleteComment !== 1) return res.sendStatus(404);
  return res.sendStatus(202);
};

module.exports = deleteComment;
