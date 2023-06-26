const showRequest = async (req, res) => {
  const {
    session,
    db: { Request },
    params: { id },
  } = req;

  if (!Number.isInteger(Number(id))) return res.sendStatus(404);
  const request = await Request.find(id);
  if (!request) return res.sendStatus(404);
  if (
    request.request_status === "Archived" &&
    session.userId !== request.user_id
  ) {
    return res.sendStatus(401);
  }

  res.send(request);
};

module.exports = showRequest;
