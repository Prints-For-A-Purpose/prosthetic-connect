const express = require("express");
const userController = require("./controllers/user");
const requestController = require("./controllers/request");
const commentsController = require("./controllers/comments");
const inviteController = require("./controllers/invitations");
const addModels = require("./middleware/add-models");
const checkAuthentication = require("./middleware/check-authentication");

const Router = express.Router();
Router.use(addModels);

Router.get("/users", userController.list);
Router.get("/users/:id", userController.show);
Router.get("/users/:id/requests", requestController.showMe);
Router.post("/users", userController.create);
Router.patch("/users/:id", checkAuthentication, userController.update);
Router.patch(
  "/users/payment/:id",
  checkAuthentication,
  userController.updatePayment
);

Router.get("/requests/home/:id", requestController.list);
Router.get("/requests/:id", requestController.show);
Router.post("/requests/", checkAuthentication, requestController.create);
Router.delete("/requests/:id", checkAuthentication, requestController.deletion);
Router.patch("/requests/:id", checkAuthentication, requestController.update);
Router.patch(
  "/requests/edit/:id",
  checkAuthentication,
  requestController.updateStatus
);

Router.get("/comments/request/:id/:page", commentsController.list);
Router.post("/comments", checkAuthentication, commentsController.create);
Router.patch("/comments/:id", checkAuthentication, commentsController.update);
Router.delete(
  "/comments/:id",
  checkAuthentication,
  commentsController.deletion
);

Router.get(
  "/invites/pending/:id",
  checkAuthentication,
  inviteController.showRequestsInvite
);
//shows all pending invitations to Recipient on the Request, returns an array of User objects
Router.get(
  "/invites/can-invite/:id",
  checkAuthentication,
  inviteController.checkIfInviteSent
);
// checks whether or not an invite can be sent to this Request. Returns boolean true or false.
Router.get("/invites/:id", inviteController.listFabricators); //list fabricators by product => also gives a count. I can make things easier by deleting the other one => sees if number matches the number of required fabricators
Router.get(
  "/invites/authorized/:id",
  checkAuthentication,
  inviteController.checksFabricatorToRequest
);
//Checks authorization of a fabricator to be a part of a request
Router.post("/invites/:id", checkAuthentication, inviteController.create); //sends an invite to a request
Router.patch(
  "/invites/change-status/:id",
  checkAuthentication,
  inviteController.changeStatus
);
Router.delete(
  "/invites/:id",
  checkAuthentication,
  inviteController.deleteAllInvitationsForYou
); //deletes all pending and rejected requests after changing progress
Router.delete(
  "/invites/archive/:id",
  checkAuthentication,
  inviteController.archiveRequest
); //deletes all requests after archiving

Router.post("/login", userController.login);
Router.delete("/logout", userController.logout);
Router.get("/me", userController.showMe);

module.exports = Router;
