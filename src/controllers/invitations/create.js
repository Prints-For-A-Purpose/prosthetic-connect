const createInv = async (req, res) => {
  const {
    session,
    db: { Invite },
    body: { user_id, request_id },
  } = req;
  // if (!session.userId) {
  //   res.send(401);
  //   return;
  // }
  const invitation = await Invite.createInvite(user_id, request_id);

  res.send(invitation);
};

module.exports = createInv;
