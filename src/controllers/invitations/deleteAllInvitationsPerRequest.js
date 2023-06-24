const deleteAllInvitationsPer = async (req, res) => {
  const {
    // session,
    db: { Invite },
    params: { id }, //request_id
  } = req;
  // if (session.is_fabricator) return res.sendStatus(401);
  const postInvite = await Invite.deleteAllInvitationsPerRequest(id); //deltes all pending and rejected requests after changing progress
  return res.sendStatus(202);
};

module.exports = deleteAllInvitationsPer;
