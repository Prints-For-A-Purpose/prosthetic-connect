const deleteRequest = async (req, res) => {
  const {
    session,
    db: { Request },
    params: { id },
  } = req;

  const requestToDelete = await Request.find(id);

  if (requestToDelete.user_id !== session.userId) return res.sendStatus(401);

  const deleteRequest = await Request.deleteRequest(id);

  if (deleteRequest !== 1) return res.sendStatus(404);

  return res.sendStatus(202);
};

module.exports = deleteRequest;
