const knex = require("../knex");
const User = require("./user");
class Invitation {
  constructor({ id, user_id, request_id, status, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.request_id = request_id;
    this.status = status;
    this.timestamp = created_at;
  }
  static async createInvite(user_id, request_id) {
    // * maybe remove the status option since defualt is 'pending'
    try {
      const query = `INSERT INTO invitations (user_id, request_id, status)
        VALUES ((SELECT id FROM users WHERE id = ?), (SELECT id FROM requests WHERE id = ?), 'pending') 
        RETURNING *`; //creates an invitation to a request
      const {
        rows: [inviteNew],
      } = await knex.raw(query, [user_id, request_id]);
      console.log(inviteNew);
      return new Invitation(inviteNew);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async rejectOrAccept(status, user_id, request_id) {
    //needs recipient authentications
    // * maybe remove the status option since defualt is 'pending'
    try {
      const query = `UPDATE invitations SET status = ? WHERE user_id = ? AND request_id = ? RETURNING *`; //creates an invitation to a request
      const {
        rows: [inviteNew],
      } = await knex.raw(query, [status, user_id, request_id]);
      return inviteNew;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async showInviteRequest(request_id) {
    try {
      //shows all the invites for a given post, should actually only send invites that are pending; count how many have been accepted;
      const query = `SELECT u.id, u.username, u.is_fabricator, u.pfp_url, i.request_id, i.created_at
      FROM invitations AS i
      INNER JOIN users AS u ON i.user_id = u.id
      WHERE i.request_id = ? AND i.status = 'pending'
      ORDER BY i.created_at DESC`;
      const { rows } = await knex.raw(query, [request_id]);
      return rows.map((fabricator) => new User(fabricator));
      //this will be used to display all pending profiles
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  //what about how many active requests a recipient has open??
  //sepereate past projects and current ones on profiles in request model

  static async checkIfOnProject(request_id, user_id) {
    try {
      //should return count of how many invitations at that request form that user is equal to 'accepted' if one, they have access. If 0 they have no access to private.
      const query = `SELECT COUNT(*) FROM invitations WHERE request_id = ? AND user_id = ? AND status = 'accepted'`; //now can check how many fabricators are on a project
      const {
        //if one or greater should be have access
        rows: [{ count }],
      } = await knex.raw(query, [request_id, user_id]);
      return Number(count) >= 1;
    } catch (err) {
      console.error(err);
      return null;
    }
  } //if this one is equal to one (checkIfOnProject === 1 && checkIfInviteSent === 0) => fabricator
  // and this other one is equal to 0 then we gucci

  //but if this one is 0 no invites (checkIfOnProject === 0) => not a fabricator
  //but also this one is one or more than no more invites (checkIfOnProject === 0 && checkIfInviteSent === 0) => no invite has every been spent, can send request
  //(checkIfOnProject === 1 && checkIfInviteSent === 1) => also a fabricator

  static async checkIfInviteSent(request_id, user_id) {
    try {
      // AND status != 'accepted' (if not 0 then false, if zero then true)
      const query = `SELECT COUNT(*) FROM invitations WHERE request_id = ? AND user_id = ?`; //now can check if rejected or pending so can't send another invite
      const {
        rows: [{ count }],
      } = await knex.raw(query, [request_id, user_id]); //if greater than 1 they shouldn not be able to request a new invite
      return Number(count) === 0;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async listRequestFabricators(request_id) {
    const query = `SELECT u.id, u.username, u.is_fabricator, u.pfp_url, i.request_id
    FROM invitations AS i 
    INNER JOIN users AS u ON i.user_id = u.id
    WHERE i.request_id = ? AND i.status = 'accepted'`;
    const { rows } = await knex.raw(query, [request_id]); // => once length of array equals certain number of fabricators the status should be accepted
    return rows.map((fabricator) => new User(fabricator)); // => can also be used to count the number of fabricators per post by nunber of rows.
  }

  static async deleteAllInvitationsPerRequest(request_id) {
    try {
      const query =
        "DELETE FROM invitations WHERE request_id = ? AND status != 'accepted';";
      const { rowCount: count } = await knex.raw(query, [request_id]);
      return count;
      // once the request has moved on from 'pending' status it should only keep all the requested users that are currently 'accepted'
    } catch (err) {
      //list all the users who are fabrictaors
      console.error(err);
      return null;
    }
  }

  static async archiveRequestInvitations(request_id) {
    try {
      const query = "DELETE FROM invitations WHERE request_id = ?;";
      const { rowCount: count } = await knex.raw(query, [request_id]);
      return count;
      // archhived request delete all users so not to keep anyone locked up
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    try {
      return knex.raw("DELETE * FROM invitations;");
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
module.exports = Invitation;
