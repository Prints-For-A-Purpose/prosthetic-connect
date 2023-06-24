const showMe = async (req, res) => {
  const {
    db: { Request, User },
    params: { id },
  } = req;

  if (!Number.isInteger(+id) || +id === 0) return res.sendStatus(404);

  const { is_fabricator } = await User.find(id);

  const requests = is_fabricator
    ? await Request.findFabProjects(id)
    : await Request.findByUserId(id);
  console.log(requests);
  res.send(requests);
};

module.exports = showMe;
