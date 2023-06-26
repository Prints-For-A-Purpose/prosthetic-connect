const updatePayment = async (req, res) => {
  const {
    db: { User },
    params: { id },
    body: { payment_url },
  } = req;

  const updatedUser = await User.updatePayment(id, payment_url);
  return updatedUser ? res.sendStatus(202) : res.sendStatus(403);
};

module.exports = updatePayment;
