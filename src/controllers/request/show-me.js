const showMe = async (req, res) => {
  const {
    db: { Request },
    params: { id },
  } = req;

  const requests = await Request.findByUserId(id);
  res.send(requests);
};

module.exports = showMe;
