const knex = require("../knex");
class Request {
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
    username,
    fabricators_needed,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.request_status = request_status;
    this.q1_disability_info = q1_disability_info;
    this.q2_functional_requirements = q2_functional_requirements;
    this.q3_physical_specifications = q3_physical_specifications;
    this.q4_lifestyle_usage = q4_lifestyle_usage;
    this.q5_additional = q5_additional;
    this.username = username;
    this.timestamp = created_at;
    this.fabricators_needed = fabricators_needed;
  }
  static async createRequests(
    user_id,
    request_status,
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    fabricators_needed
  ) {
    try {
      const query = `INSERT INTO requests (user_id, request_status, q1_disability_info, q2_functional_requirements, q3_physical_specifications, q4_lifestyle_usage, q5_additional, fabricators_needed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
        RETURNING *`;
      const {
        rows: [request],
      } = await knex.raw(query, [
        user_id,
        request_status,
        q1_disability_info,
        q2_functional_requirements,
        q3_physical_specifications,
        q4_lifestyle_usage,
        q5_additional,
        fabricators_needed,
      ]);
      return new Request(request);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async find(id) {
    try {
      const query = `SELECT r.id, r.user_id, r.request_status, r.q1_disability_info, r.q2_functional_requirements, r.q3_physical_specifications, r.q4_lifestyle_usage, r.q5_additional, r.fabricators_needed, r.created_at, u.username
      FROM requests AS r
      INNER JOIN users AS u ON r.user_id = u.id
      WHERE r.id = ?`;
      //SELECT request_id FROM invitations WHERE user_id = 1 AND status = 'accepted';
      const {
        rows: [request],
      } = await knex.raw(query, [id]);
      return request ? new Request(request) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async list(page, is_fabricator) {
    try {
      page = (Number(page) - 1) * 3;
      const query =
        typeof is_fabricator === "boolean" && is_fabricator === true
          ? `SELECT * 
      FROM requests
      WHERE request_status = 'Pending'
      ORDER BY 
      created_at DESC
      OFFSET ? 
      ROWS LIMIT 4`
          : typeof is_fabricator === "boolean" && is_fabricator === false
          ? `SELECT * 
          FROM requests 
          WHERE NOT request_status = 'Archived'
          ORDER BY 
          created_at DESC
          OFFSET ? 
          ROWS LIMIT 4`
          : `SELECT * 
          FROM requests
          WHERE request_status = 'Deployment' 
          ORDER BY 
          created_at DESC
          OFFSET ? 
          ROWS LIMIT 4`;
      const { rows } = await knex.raw(query, [page]);
      return rows.map((request) => new Request(request));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async findByUserId(id) {
    const query = "SELECT * FROM requests WHERE user_id = ?";
    const { rows } = await knex.raw(query, [id]);
    return rows.map((request) => new Request(request));
  }

  static async findFabProjects(id) {
    const query = `SELECT r.id, r.q1_disability_info, r.q2_functional_requirements, r.q3_physical_specifications, r.q4_lifestyle_usage, r.q5_additional, r.request_status FROM (SELECT request_id FROM invitations WHERE user_id = ? AND status = 'accepted') AS i
    LEFT JOIN requests AS r ON r.id = i.request_id`;
    const { rows } = await knex.raw(query, [id]);
    return rows.map((request) => new Request(request));
  }

  static async deleteRequest(request_id) {
    try {
      const query1 = `DELETE FROM invitations WHERE request_id = ?;`;
      const query2 = `DELETE FROM comments WHERE request_id = ?`;
      const query3 = `DELETE FROM requests WHERE id = ?`;
      await knex.raw(query1, [request_id]);
      await knex.raw(query2, [request_id]);
      const { rowCount: count } = await knex.raw(query3, [request_id]);
      return count;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async updateContent(id, q1, q2, q3, q4, q5, num) {
    try {
      const query = `UPDATE requests
        SET q1_disability_info = ?, q2_functional_requirements = ?, q3_physical_specifications = ?, q4_lifestyle_usage = ?, q5_additional = ?, fabricators_needed = ?
        WHERE id = ?`;
      const { rowCount: count } = await knex.raw(query, [
        q1,
        q2,
        q3,
        q4,
        q5,
        num,
        id,
      ]);
      return count ? count : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async updateStatus(id, request_status) {
    try {
      const query = `UPDATE requests
        SET request_status = ?
        WHERE id = ?`;
      const { rowCount: count } = await knex.raw(query, [request_status, id]);
      return count ? count : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    try {
      return knex.raw("DELETE * FROM requests;");
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
module.exports = Request;
