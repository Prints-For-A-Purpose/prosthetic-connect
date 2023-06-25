const knex = require("../knex");

class Skill {
  constructor({ id, user_id, skill_name }) {
    this.id = id;
    this.user_id = user_id;
    this.skill_name = skill_name;
  }

  static async list(user_id) {
    const query = `SELECT * FROM skills WHERE user_id = ?;`;
    const { rows } = await knex.raw(query, [user_id]);
    return rows.map((skills) => new Skill(skills));
  }

  static async createSkill(user_id, skill_name) {
    const query = `INSERT INTO skills ( user_id, skill_name )
    VALUES (?, ?) RETURNING *;`;
    const {
      rows: [skill],
    } = await knex.raw(query, [user_id, skill_name]);
    return new Skill(skill);
  }

  static async deleteSkill(id) {
    try {
      const query = `DELETE FROM skills WHERE id = ?`;
      const { rowCount: count } = await knex.raw(query, [id]);
      return count;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  // static async find(id) {
  //   try {
  //     const query = `SELECT * FROM comments WHERE id = ?`;
  //     const {
  //       rows: [comment],
  //     } = await knex.raw(query, [id]);
  //     return comment ? new Comment(comment) : null;
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }

  // update = async (content) => {
  //   const [updatedContent] = await knex("comments")
  //     .where({ id: this.id })
  //     .update({ content })
  //     .returning("*");
  //   return updatedContent ? new Comment(updatedContent) : null;
  // };
}

module.exports = Skill;
