const changeStatus = async (req, res) => {
  const {
    session,
    db: { Invite },
    body: { status, user_id },
    params: { id }, //request_id
  } = req;
  if (session.is_fabricator) return res.sendStatus(401);
  const invitation = await Invite.rejectOrAccept(status, user_id, id);
  res.send(invitation);
};

module.exports = changeStatus;
