const showUser = async (req, res) => {
    const {
      db: { Invite },
      params: { id },
    } = req;
  
    const userInvite = await Invite.showInviteUser(id);
    res.send(userInvite);
  };
  
  module.exports = showUser;
  