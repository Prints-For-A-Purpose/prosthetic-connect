const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, is_fabricator },
  } = req;

  // TODO: check if username is taken, what should you return?
  const user = await User.create(username, password, is_fabricator);
  session.userId = user.id;

  res.send(user);
};

module.exports = createUser;
