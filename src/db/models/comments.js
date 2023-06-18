const knex = require("../knex");
// const { hashPassword, isValidPassword } = require("../../utils/auth-utils");

class Comment {
  //   #passwordHash = null;

  constructor({
    id,
    request_id,
    user_id,
    content,
    is_public,
    created_at,
    username,
  }) {
    this.id = id;
    this.request_id = request_id;
    this.user_id = user_id;
    this.content = content;
    this.is_public = is_public;
    this.timestamp = created_at;
    this.username = username;
  }

  static async list(id) {
    const query = `SELECT c.id, c.request_id, c.user_id, c.content, c.is_public, c.created_at, u.username
    FROM comments AS c
    INNER JOIN users AS u ON c.user_id = u.id
    WHERE c.request_id = ? 
    ORDER BY 
    c.created_at DESC`;
    const { rows } = await knex.raw(query, [id]);
    return rows.map((comments) => new Comment(comments));
  }

  //   static async findByUsername(username) {
  //     const query = "SELECT * FROM users WHERE username = ?";
  //     const {
  //       rows: [user],
  //     } = await knex.raw(query, [username]);
  //     return user ? new User(user) : null;
  //   }

  static async createComment(request_id, user_id, content, is_public) {
    const query = `INSERT INTO comments (request_id, user_id, content, is_public)
    VALUES (?, ?, ?, ? ) RETURNING *;`;
    const {
      rows: [comment],
    } = await knex.raw(query, [request_id, user_id, content, is_public]);
    return new Comment(comment);
  }

  //   static async deleteAll() {
  //     return knex.raw("TRUNCATE users;");
  //   }

  //   update = async (username) => {
  //     // dynamic queries are easier if you add more properties
  //     const [updatedUser] = await knex("users")
  //       .where({ id: this.id })
  //       .update({ username })
  //       .returning("*");
  //     return updatedUser ? new User(updatedUser) : null;
  //   };

  //   isValidPassword = async (password) =>
  //     isValidPassword(password, this.#passwordHash);
}

module.exports = Comment;
