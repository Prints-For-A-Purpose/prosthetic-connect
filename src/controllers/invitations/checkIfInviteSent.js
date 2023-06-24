const checkIfInviteSent = async (req, res) => {
  const {
    session,
    db: { Invite },
    params: { id },
  } = req;
  const requestQueryCount = await Invite.checkIfInviteSent(id, session.userId); //checks if you already sent an invite that hasn't been accpeted so either pedning or rejected
  res.send(requestQueryCount);
};

module.exports = checkIfInviteSent;
