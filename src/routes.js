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

Router.get("/invite-all", inviteController.listAll);
Router.post("/invite", inviteController.create);
Router.get("/invite/:id/user", inviteController.showUsersInvites);
Router.get("/invite/:id/request", inviteController.showRequestsInvite);

Router.post("/login", userController.login);
Router.delete("/logout", userController.logout);
Router.get("/me", userController.showMe);

module.exports = Router;
