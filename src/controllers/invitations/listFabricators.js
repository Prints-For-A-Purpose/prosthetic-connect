const listFabricators = async (req, res) => {
  const {
    db: { Invite },
    params: { id }, //request id
  } = req;
  const invitation = await Invite.listRequestFabricators(id); //list fabricators by product

  res.send(invitation);
};

module.exports = listFabricators;
