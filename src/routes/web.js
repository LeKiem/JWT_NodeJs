import express from "express";
import HomeController from "../controller/homeController";
const router = express.Router();

const initWebRouters = (app) => {
  router.get("/", HomeController.handleHome);
  router.get("/user", HomeController.handleUserPage);
  return app.use("/", router);
};

export default initWebRouters;
