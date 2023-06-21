const listRequests = async (req, res) => {
  const {
    session,
    db: { Request },
    params: { id },
  } = req;

  const requests = await Request.list(id, session.is_fabricator);
  res.send(requests);
};

module.exports = listRequests;
