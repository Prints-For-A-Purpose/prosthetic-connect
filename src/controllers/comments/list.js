const listComments = async (req, res) => {
  const {
    db: { Comment },
    params: { id },
  } = req;
  const comments = await Comment.list(id);
  res.send(comments);
};

module.exports = listComments;
