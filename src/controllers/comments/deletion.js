const deleteComment = async (req, res) => {
  const {
    db: { Comment },
    params: { id },
  } = req;

  const deleteComment = await Comment.deleteComment(id);
  if (deleteComment !== 1) return res.sendStatus(404);
  return res.sendStatus(202);
};

module.exports = deleteComment;
