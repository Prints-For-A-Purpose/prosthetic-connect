const createSkills = async (req, res) => {
  const {
    db: { Skill },
    params: { id },
    body: { skill_name },
  } = req;

  const skill = await Skill.createSkill(id, skill_name);

  res.send(skill);
};

module.exports = createSkills;
