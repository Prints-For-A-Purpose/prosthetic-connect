const showPosts = async (req, res) => {
  const {
    db: { Invite },
    params: { id }, //request_id
  } = req;

  const postInvite = await Invite.showInviteRequest(id); //show reciepietn who is interested in the project
  res.send(postInvite);
};

module.exports = showPosts;
