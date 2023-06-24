const updateRequest = async (req, res) => {
  const {
    db: { Request },
    params: { id },
    body: {
      q1_disability_info,
      q2_functional_requirements,
      q3_physical_specifications,
      q4_lifestyle_usage,
      q5_additional,
      fabricators_needed,
    },
  } = req;

  const update = await Request.updateContent(
    id,
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    fabricators_needed
  );
  if (!update) return res.sendStatus(404);

  return res.sendStatus(202);
};

module.exports = updateRequest;
