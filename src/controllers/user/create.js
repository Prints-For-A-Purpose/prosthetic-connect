const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, is_fabricator },
  } = req;

  // TODO: check if username is taken, what should you return?
  //we can return an error code and user already exist
  const user = await User.create(username, password, is_fabricator);

  session.userId = user.id;
  session.is_fabricator = user.is_fabricator;
  session.username = user.username;

  res.send(user);
};

module.exports = createUser;
