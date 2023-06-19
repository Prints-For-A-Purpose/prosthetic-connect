const express = require("express");
const userController = require("./controllers/user");
const requestController = require("./controllers/request");
const commentsController = require("./controllers/comments");
const addModels = require("./middleware/add-models");
const checkAuthentication = require("./middleware/check-authentication");

const Router = express.Router();
Router.use(addModels);

Router.get("/users", userController.list);
Router.post("/users", userController.create);
Router.get("/users/:id", userController.show);
Router.get("/users/:id/requests", requestController.showMe);

Router.post("/requests/", requestController.create);
Router.get("/requests/", requestController.list);
Router.get("/requests/:id", requestController.show);

Router.post("/comments", commentsController.create);
Router.get("/comments/:id", commentsController.list);
// We can use middleware slotted in between the route and the controller as well
Router.patch("/users/:id", checkAuthentication, userController.update);

Router.post("/login", userController.login);
Router.delete("/logout", userController.logout);
Router.get("/me", userController.showMe);

Router.get("/logged-in-secret", checkAuthentication, (req, res) => {
  res.send({ msg: "The secret is: there is no secret." });
});

module.exports = Router;
