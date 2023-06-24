const createInv = async (req, res) => {
  const {
    session,
    db: { Invite },
    params: { id }, //request id
  } = req;
  if (!session.is_fabricator) return res.sendStatus(401);
  const invitation = await Invite.createInvite(session.userId, id);
  //sends an invite to a request only if logged in and is a fabricator
  res.send(invitation);
};

module.exports = createInv;
