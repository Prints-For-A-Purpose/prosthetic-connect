const knex = require("../knex");
class Invitation {
    constructor({ 
        id, 
        user_id, 
        request_id,
        status
    }) {   
        this.id = id;
        this.user_id = user_id;
        this.request_id = request_id;
        this.status = status
    }
    static async createInvite (user_id, request_id, status) {
    try {
      const query = `INSERT INTO invitations (user_id, request_id, status)
        VALUES ((SELECT id FROM users WHERE id = ?), (SELECT id FROM requests WHERE id = ?), ?) 
        RETURNING *`;
      const {
        rows: [inviteNew],
      } = await knex.raw(query, [user_id, request_id, status]);
       console.log(inviteNew)
      return new Invitation(inviteNew);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async showInviteUser(user_id){
    try {
      const query = `SELECT * FROM invitations WHERE user_id = ?`;
      const { rows } = await knex.raw(query, [user_id]);
      return rows.map((usersInv) => new Invitation(usersInv))
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async showInviteRequest(request_id){
    try {
      const query = `SELECT * FROM invitations WHERE request_id = ?`;
      const { rows } = await knex.raw(query, [request_id]);
      const mapped = rows.map((postsInv) => new Invitation(postsInv))
      return mapped.length != 0 ? mapped: null
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async showRequestCount(request_id){
    try {
      const query = `SELECT COUNT(*) FROM invitations where request_id = ?`;
      const { rows } = await knex.raw(query, [request_id]);
      console.log(rows)
      return rows
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async showInviteCount(){
    try {
      const query = `SELECT * FROM invitations`;
      const { rows } = await knex.raw(query);
      console.log(rows)
      return rows.map((invites) => new Invitation(invites));    
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    try {
      return knex.raw('DELETE * FROM invitations;');
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
module.exports = Invitation;