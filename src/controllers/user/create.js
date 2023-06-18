const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password },
  } = req;

  // TODO: check if username is taken, what should you return?
  //we can return an error code and user already exist 
  const user = await User.create(username, password, is_fabricator);
  session.userId = user.id;

  res.send(user);
};

module.exports = createUser;
