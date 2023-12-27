import express from "express";
import HomeController from "../controller/homeController";
import apiController from "../controller/apiController";
const router = express.Router();

const initWebRouters = (app) => {
  router.get("/", HomeController.handleHome);
  router.get("/user", HomeController.handleUserPage);
  router.post("/users/create-user", HomeController.handleCreateNewUser);
  router.post("/delete-user/:id", HomeController.handleDeleteUser);
  router.get("/update-user/:id", HomeController.getUpdateUserPage);
  router.post("/users/update-user", HomeController.handleUpdateUser);

  router.get("/api/test-api", apiController.testApi);
  return app.use("/", router);
};

export default initWebRouters;
