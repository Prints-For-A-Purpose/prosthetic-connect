const knex = require("../knex");
class Invitation {
    constructor({ 
        id, 
        user_id, 
        request_id
    }) {   
        this.id = id;
        this.user_id = user_id;
        this.request_id = request_id;
    }
    static async createInvite (user_id, request_id) {
    try {
      const query = `INSERT INTO invitations (user_id, request_id)
        VALUES ((SELECT user_id FROM users WHERE id = ?), (SELECT request_id FROM requests WHERE id = ?)) 
        RETURNING *`;
      const {
        rows: [inviteNew],
      } = await knex.raw(query, [user_id, request_id]);
       console.log(request)
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
      const mapped = rows.map((usersInv) => new Invitation(usersInv))
      return mapped.length != 0 ? mapped: null
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async showInviteRequest(request_id){
    try {
      const query = `SELECT * FROM invitations WHERE request_id = ?`;
      const { rows } = await knex.raw(query, [request_id]);
      const mapped = rows.map((postsInv) => new Request(postsInv))
      return mapped.length != 0 ? mapped: null
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async showInviteAll(){
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