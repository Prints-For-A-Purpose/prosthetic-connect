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
    image_url,
    category,
    pfp_url,
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
    this.category = category;
    this.image_url = image_url;
    this.pfp_url = pfp_url;
  }
  static async createRequests(
    user_id,
    request_status,
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    fabricators_needed,
    category
  ) {
    try {
      const query = `INSERT INTO requests (user_id, request_status, q1_disability_info, q2_functional_requirements, q3_physical_specifications, q4_lifestyle_usage, q5_additional, fabricators_needed, category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) 
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
        category,
      ]);
      return new Request(request);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async find(id) {
    try {
      const query = `SELECT r.id, r.user_id, r.request_status, r.q1_disability_info, r.q2_functional_requirements, r.q3_physical_specifications, r.q4_lifestyle_usage, r.q5_additional, r.fabricators_needed, r.created_at, r.category, r.image_url, u.username, u.pfp_url
      FROM requests AS r
      INNER JOIN users AS u ON r.user_id = u.id
      WHERE r.id = ?`;
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
      page = (Number(page) - 1) * 9;
      const query = `SELECT * 
          FROM requests 
          WHERE NOT request_status = 'Archived'
          ORDER BY 
          created_at DESC
          OFFSET ? 
          ROWS LIMIT 9`;
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
    const query = `SELECT r.id, r.q1_disability_info, r.q2_functional_requirements, r.q3_physical_specifications, r.q4_lifestyle_usage, r.q5_additional, r.request_status, r.image_url, r.fabricators_needed, r.category FROM (SELECT request_id FROM invitations WHERE user_id = ? AND status = 'accepted') AS i
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

  static async updateContent(id, q1, q2, q3, q4, q5, num, cat) {
    const query1 = `SELECT r.id, r.user_id, r.request_status, r.q1_disability_info, r.q2_functional_requirements, r.q3_physical_specifications, r.q4_lifestyle_usage, r.q5_additional, r.fabricators_needed, r.created_at, r.category, r.image_url, u.username, u.pfp_url
        FROM requests AS r
        INNER JOIN users AS u ON r.user_id = u.id
        WHERE r.id = ?`;
    const {
      rows: [request],
    } = await knex.raw(query1, [id]);
    if (
      (request.fabricators_needed === 0 ||
        request.fabricators_needed === undefined ||
        request.fabricators_needed === null ||
        request.fabricators_needed === "") &&
      (num === "" || num === undefined || num === 0 || num === null)
    ) {
      num = 1;
      num = 1;
    } else if (num === "" || num === undefined || num === 0 || num === null) {
      num = request.fabricators_needed;
    }
    const query = `UPDATE requests
      SET q1_disability_info = ?, q2_functional_requirements = ?, q3_physical_specifications = ?, q4_lifestyle_usage = ?, q5_additional = ?, fabricators_needed = ?, category = ?
      WHERE id = ?`;
    const { rowCount: count } = await knex.raw(query, [
      q1,
      q2,
      q3,
      q4,
      q5,
      num,
      cat,
      id,
    ]);
    return count ? count : null;
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
