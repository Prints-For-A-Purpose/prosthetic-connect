const listSkills = async (req, res) => {
  const {
    db: { Skill },
    params: { id }, //user_id
  } = req;

  const skill = await Skill.list(id);
  res.send(skill);
};

module.exports = listSkills;
