const createInv = async (req, res) => {
  const {
    session,
    db: { Invite },
    body: { user_id, request_id, status },
  } = req;
  // if (!session.userId) {
  //   res.send(401);
  //   return;
  // }
  const invitation = await Invite.createInvite(user_id, request_id, status);

  res.send(invitation);
};

module.exports = createInv;
