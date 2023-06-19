const knex = require("../../db/knex");

const createRequest = async (req, res) => {
  const {
    session,
    db: { Request },
    // body: { details, requirement, specifications, daily_routine, additional_requests },
    body: {
      q1_disability_info,
      q2_functional_requirements,
      q3_physical_specifications,
      q4_lifestyle_usage,
      q5_additional,
    },
  } = req;

  if (!session.userId) {
    res.send(401);
    return;
  }

  //on submit sends the questionnaire data to db
  const request_status = "Active";
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
