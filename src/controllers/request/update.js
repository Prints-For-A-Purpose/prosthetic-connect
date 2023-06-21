// const { isAuthorized } = require("../../utils/auth-utils");

const updateRequest = async (req, res) => {
  const {
    // session,
    db: { Request },
    params: { id },
    body: {
      q1_disability_info,
      q2_functional_requirements,
      q3_physical_specifications,
      q4_lifestyle_usage,
      q5_additional,
    },
  } = req;

  //   if (!isAuthorized(id, session)) return res.sendStatus(403);

  const update = await Request.updateContent(
    id,
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional
  );
  if (!update) return res.sendStatus(404);

  //   const updatedUser = await user.update(username);
  return res.sendStatus(202);
};

module.exports = updateRequest;
