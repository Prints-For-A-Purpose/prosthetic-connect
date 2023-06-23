const knex = require("../../db/knex");

const createRequest = async (req, res) => {
  const {
    session,
    db: { Request },
    body: {
      q1_disability_info,
      q2_functional_requirements,
      q3_physical_specifications,
      q4_lifestyle_usage,
      q5_additional,
      draft,
    },
  } = req;

  console.log(draft);

  if (!session.userId) return res.sendStatus(401);

  if (
    typeof session.is_fabricator === "boolean" &&
    session.is_fabricator === true
  ) {
    return res.sendStatus(401);
  }

  const request_status = draft ? "Archived" : "Active";
  const user_id = session.userId;

  const newRequest = await Request.createRequests(
    user_id,
    request_status,
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional
  );

  res.send(newRequest);
};

module.exports = createRequest;
