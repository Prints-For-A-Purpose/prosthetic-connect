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
Router.patch("/users/:id", checkAuthentication, userController.update);

Router.post("/requests/", requestController.create);
Router.get("/requests/home/:id", requestController.list);
Router.get("/requests/:id", requestController.show);

Router.post("/comments", commentsController.create);
Router.get("/comments/request/:id", commentsController.list);
Router.patch("/comments/:id", checkAuthentication, commentsController.update);
Router.delete("/comments/:id", commentsController.deletion);

Router.post("/login", userController.login);
Router.delete("/logout", userController.logout);
Router.get("/me", userController.showMe);

module.exports = Router;
