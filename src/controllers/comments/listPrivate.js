const listPrivateComments = async (req, res) => {
  const {
    db: { Comment },
    params: { id, page },
  } = req;

  const comments = await Comment.listPrivate(id, page);
  res.send(comments);
};

module.exports = listPrivateComments;
