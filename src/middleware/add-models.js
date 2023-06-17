const User = require('../db/models/user');
const Request = require('../db/models/requests')

const addModels = (req, res, next) => {
  req.db = {
    User,
    Request,
  };
  next();
};

module.exports = addModels;
