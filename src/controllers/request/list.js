const listRequests = async (req, res) => {
  const { Request } = req.db;
  const requests = await Request.list();
  res.send(requests);
};

module.exports = listRequests;
