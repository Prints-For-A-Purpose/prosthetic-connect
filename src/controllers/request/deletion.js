const deleteRequest = async (req, res) => {
  const {
    db: { Request },
    params: { id },
  } = req;

  const deleteRequest = await Request.deleteRequest(id);
  if (deleteRequest !== 1) return res.sendStatus(404);
  return res.sendStatus(202);
};

module.exports = deleteRequest;
