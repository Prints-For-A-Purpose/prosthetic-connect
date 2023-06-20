const showPosts = async (req, res) => {
    const {
      db: { Invite },
      params: { id },
    } = req;
  
    const postInvite = await Invite.showInviteRequest(id);
    res.send(postInvite);
  };
  
  module.exports = showPosts;
  