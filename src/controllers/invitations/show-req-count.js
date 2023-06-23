const showReqCount = async (req, res) => {
    const {
      db: { Invite },
      params: { id },
    } = req;
  
    const reqestQueryCount = await Invite.showRequestCount(id);
    res.send(reqestQueryCount);
  };
  
  module.exports = showReqCount;
  