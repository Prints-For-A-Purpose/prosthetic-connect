const deleteAllInvitationsPer = async (req, res) => {
  const {
    db: { Invite },
    params: { id }, //request_id
  } = req;
  await Invite.deleteAllInvitationsPerRequest(id); //deltes all pending and rejected requests after changing progress
  return res.sendStatus(202);
};

module.exports = deleteAllInvitationsPer;
