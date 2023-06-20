const listAll = async (req, res) => {
    const {
      db: { Invite }
    } = req;
    const allInv = await Invite.showInviteAll();
    res.send(allInv);
  };
  
  module.exports = listAll;