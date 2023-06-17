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
        q5_additional
    }) {
    
    this.id = id;
    this.user_id = user_id;
    this.request_status = request_status;
    this.q1_disability_info = q1_disability_info;
    this.q2_functional_requirements = q2_functional_requirements;
    this.q3_physical_specifications = q3_physical_specifications;
    this.q4_lifestyle_usage = q4_lifestyle_usage; 
    this.q5_additional  = q5_additional;
  }
  static async createRequests 
    (
        id, 
        user_id, 
        request_status, 
        q1_disability_info,
        q2_functional_requirements,
        q3_physical_specifications,
        q4_lifestyle_usage, 
        q5_additional
    ) {
    try {
      const query = `INSERT INTO requests (user_id, request_status, q1_disability_info, q2_functional_requirements, q3_physical_specifications, q4_lifestyle_usage, q5_additional)
        VALUES ((SELECT user_id FROM users WHERE id = ?), ?, ?, ?, ?, ?, ?) 
        RETURNING *`;
      const {
        rows: [request],
      } = await knex.raw(query, [user_id, request_status, q1_disability_info, q2_functional_requirements, q3_physical_specifications, q4_lifestyle_usage, q5_additional]);
       console.log(request)
      return new Request(request);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async showRequestSpecific(id){
    try {
      const query = `SELECT * FROM requests WHERE id = ?`;
      const { rows } = await knex.raw(query, [id]);
      const mapped = rows.map((request) => new Request(request))
      return mapped.length != 0 ? mapped: null
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async showRequestAll(){
    try {
      const query = `SELECT * FROM requests`;
      const { rows } = await knex.raw(query);
      console.log(rows)
      return rows.map((requests) => new Bidding(requests));    
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  updateStatus = async (request_status) => { 
    try {
      const [updatedRequest] = await knex('requests')
        .where({ id: this.id })
        .update({ request_status })
        .returning('*');
      return updatedRequest ? new Request(updatedRequest) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  updateContent = async (content) => { 
    try {
      const [updatedContent] = await knex('requests')
        .where({ id: this.id })
        .update({ content })
        .returning('*');
      return updatedContent ? new Request(updatedContent) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  static async deleteAll() {
    try {
      return knex.raw('DELETE * FROM requests;');
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
module.exports = Request;