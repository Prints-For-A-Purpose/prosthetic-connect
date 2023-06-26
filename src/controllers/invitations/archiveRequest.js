const archiveRequest = async (req, res) => {
  const {
    db: { Invite },
    params: { id }, //request_id
  } = req;

  await Invite.archiveRequestInvitations(id); //deletes all requests after archiving
  return res.sendStatus(202);
};

module.exports = archiveRequest;
