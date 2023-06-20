const showRequest = async (req, res) => {
  const {
    db: { Request },
    params: { id },
  } = req;

  if (!Number.isInteger(id)) return res.sendStatus(404);
  const request = await Request.find(id);
  if (!request) return res.sendStatus(404);

  res.send(request);
};

module.exports = showRequest;
