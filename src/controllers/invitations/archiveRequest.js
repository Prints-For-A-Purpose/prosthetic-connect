const archiveRequest = async (req, res) => {
  const {
    // session,
    db: { Invite },
    params: { id }, //request_id
  } = req;
  // if (session.is_fabricator) return res.sendStatus(401);
  const postInvite = await Invite.archiveRequestInvitations(id); //deltes all requests after archiving
  return res.sendStatus(202);
};

module.exports = archiveRequest;
