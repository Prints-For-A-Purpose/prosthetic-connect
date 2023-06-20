const User = require("../db/models/user");
const Request = require("../db/models/requests");
const Comment = require("../db/models/comments");
const Invite = require("../db/models/invitations")

const addModels = (req, res, next) => {
  req.db = {
    User,
    Request,
    Comment,
    Invite
  };
  next();
};

module.exports = addModels;
