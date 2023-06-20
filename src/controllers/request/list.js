const listRequests = async (req, res) => {
  const {
    db: { Request },
    params: { id },
  } = req;

  const requests = await Request.list(id);
  res.send(requests);
};

module.exports = listRequests;
