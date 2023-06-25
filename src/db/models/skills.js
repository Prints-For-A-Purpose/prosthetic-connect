const knex = require("../knex");

class Skill {
  constructor({ id, user_id, skill_name }) {
    this.id = id;
    this.user_id = user_id;
    this.skill_name = skill_name;
  }

  static async list(id, page) {
    page = (Number(page) - 1) * 7;
    const query = `SELECT c.id, c.request_id, c.user_id, c.content, c.is_public, c.created_at, c.is_public, u.username, u.pfp_url
    FROM comments AS c
    INNER JOIN users AS u ON c.user_id = u.id
    WHERE c.request_id = ? AND c.is_public = TRUE
    ORDER BY 
    c.created_at DESC
    OFFSET ?
    ROWS lIMIT 15;`;
    const { rows } = await knex.raw(query, [id, page]);
    return rows.map((comments) => new Comment(comments));
  }

  static async listPrivate(id, page) {
    page = (Number(page) - 1) * 7;
    const query = `SELECT c.id, c.request_id, c.user_id, c.content, c.is_public, c.created_at, c.is_public, u.username, u.pfp_url
    FROM comments AS c
    INNER JOIN users AS u ON c.user_id = u.id
    WHERE c.request_id = ? AND c.is_public = FALSE
    ORDER BY 
    c.created_at DESC
    OFFSET ?
    ROWS lIMIT 15;`;
    const { rows } = await knex.raw(query, [id, page]);
    return rows.map((comments) => new Comment(comments));
  }

  static async createComment(request_id, user_id, content, is_public) {
    const query = `INSERT INTO comments (request_id, user_id, content, is_public)
    VALUES (?, ?, ?, ? ) RETURNING *;`;
    const {
      rows: [comment],
    } = await knex.raw(query, [request_id, user_id, content, is_public]);
    return new Comment(comment);
  }

  static async find(id) {
    try {
      const query = `SELECT * FROM comments WHERE id = ?`;
      const {
        rows: [comment],
      } = await knex.raw(query, [id]);
      return comment ? new Comment(comment) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteComment(id) {
    try {
      const query = `DELETE FROM comments WHERE id = ?`;
      const { rowCount: count } = await knex.raw(query, [id]);
      return count;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  update = async (content) => {
    const [updatedContent] = await knex("comments")
      .where({ id: this.id })
      .update({ content })
      .returning("*");
    return updatedContent ? new Comment(updatedContent) : null;
  };
}

module.exports = Skill;
