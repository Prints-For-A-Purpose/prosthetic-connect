const checksIfFabricatorToRequest = async (req, res) => {
  const {
    session,
    db: { Invite },
    params: { id },
  } = req;

  const requestQueryCount = await Invite.checkIfOnProject(id, session.userId); //authorize a fabricator to a request
  res.send(requestQueryCount);
};

module.exports = checksIfFabricatorToRequest;
