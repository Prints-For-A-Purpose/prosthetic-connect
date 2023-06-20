const listComments = async (req, res) => {
  const {
    db: { Comment },
    params: { id, page },
  } = req;

  const comments = await Comment.list(id, page);
  res.send(comments);
};

module.exports = listComments;
