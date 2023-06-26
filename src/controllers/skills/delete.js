const deleteSkill = async (req, res) => {
  const {
    db: { Skill },
    params: { id },
  } = req;

  const deleteSkill = await Skill.deleteSkill(id);
  if (deleteSkill === 1) return res.sendStatus(202);
  return res.sendStatus(404);
};

module.exports = deleteSkill;
