const updateRequestStatus = async (req, res) => {
  const {
    db: { Request },
    params: { id },
    body: { request_status },
  } = req;

  const updateStatus = await Request.updateStatus(id, request_status);
  if (!updateStatus) return res.sendStatus(404);

  return res.sendStatus(202);
};

module.exports = updateRequestStatus;
