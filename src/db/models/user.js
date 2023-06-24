const knex = require("../knex");
const { hashPassword, isValidPassword } = require("../../utils/auth-utils");

class User {
  #passwordHash = null;

  constructor({
    id,
    username,
    password_hash,
    is_fabricator,
    bio,
    payment_url,
    pfp_url,
  }) {
    this.id = id;
    this.username = username;
    this.is_fabricator = is_fabricator;
    this.#passwordHash = password_hash;
    this.bio = bio;
    this.payment_url = payment_url;
    this.pfp_url = pfp_url;
  }

  static async list() {
    const query = "SELECT * FROM users";
    const { rows } = await knex.raw(query);
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const {
      rows: [user],
    } = await knex.raw(query, [id]);
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = "SELECT * FROM users WHERE username = ?";
    const {
      rows: [user],
    } = await knex.raw(query, [username]);
    return user ? new User(user) : null;
  }

  static async create(username, password, is_fabricator) {
    const passwordHash = await hashPassword(password);

    const query = `INSERT INTO users (username, password_hash, is_fabricator, pfp_url)
      VALUES (?, ?, ?, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png') RETURNING *`;
    const {
      rows: [user],
    } = await knex.raw(query, [username, passwordHash, is_fabricator]);
    return new User(user);
  }

  static async updatePayment(id, payment_url) {
    try {
      const query = `UPDATE users
        SET payment_url = ?
        WHERE id = ?`;
      const { rowCount: count } = await knex.raw(query, [payment_url, id]);
      return count ? count : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    return knex.raw("TRUNCATE users;");
  }

  update = async (username) => {
    // dynamic queries are easier if you add more properties
    const [updatedUser] = await knex("users")
      .where({ id: this.id })
      .update({ username })
      .returning("*");
    return updatedUser ? new User(updatedUser) : null;
  };

  isValidPassword = async (password) =>
    isValidPassword(password, this.#passwordHash);
}

module.exports = User;
