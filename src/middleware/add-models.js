const User = require("../db/models/user");
const Request = require("../db/models/requests");
const Comment = require("../db/models/comments");

const addModels = (req, res, next) => {
  req.db = {
    User,
    Request,
    Comment,
  };
  next();
};

module.exports = addModels;
