const knex = require("../knex");
// const { hashPassword, isValidPassword } = require("../../utils/auth-utils");

class Request {
  //   #passwordHash = null;

  constructor({
    id,
    user_id,
    request_status,
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    created_at,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.request_status = request_status;
    this.q1_disability_info = q1_disability_info;
    this.q2_functional_requirements = q2_functional_requirements;
    this.q3_physical_specifications = q3_physical_specifications;
    this.q4_lifestyle_usage = q4_lifestyle_usage;
    this.q5_additional = q5_additional;
    this.timestamp = created_at;
  }

  static async list() {
    const query = "SELECT * FROM requests";
    const { rows } = await knex.raw(query);
    return rows.map((request) => new Request(request));
  }

  static async find(id) {
    const query = "SELECT * FROM requests WHERE id = ?";
    const {
      rows: [request],
    } = await knex.raw(query, [id]);
    return request ? new Request(request) : null;
  }

  static async findByUserId(id) {
    const query = "SELECT * FROM requests WHERE user_id = ?";
    const { rows } = await knex.raw(query, [id]);
    return rows.map((request) => new Request(request));
  }

  //   static async create(username, password, is_fabricator) {
  //     const passwordHash = await hashPassword(password);

  //     const query = `INSERT INTO users (username, password_hash, is_fabricator)
  //       VALUES (?, ?, ?) RETURNING *`;
  //     const {
  //       rows: [user],
  //     } = await knex.raw(query, [username, passwordHash, is_fabricator]);
  //     return new User(user);
  //   }

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

module.exports = Request;
