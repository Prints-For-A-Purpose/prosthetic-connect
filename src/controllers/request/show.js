const showRequest = async (req, res) => {
  const {
    db: { Request },
    params: { id },
  } = req;

  const request = await Request.find(id);
  if (!request) return res.sendStatus(404);

  res.send(request);
};

module.exports = showRequest;
