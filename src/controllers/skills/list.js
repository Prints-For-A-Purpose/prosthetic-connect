const listSkills = async (req, res) => {
  const {
    session,
    db: { Skill },
    params: { id },
  } = req;

  // const requests = await Request.list(id, session.is_fabricator);
  // res.send(requests);
};

module.exports = listSkills;
