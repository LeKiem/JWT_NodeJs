import express from "express";

import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkuserpermission } from "../middleware/JWTActions";
import roleController from "../controller/roleController";
const router = express.Router();
const testMiddleware = (req, res, next) => {
  console.log("Middlware");
  next();
};
// const checkuserLogin = (req, res, next) =>{
//   const nonSecurePaths = ['/', '/register', '/login'];
//   if(nonSecurePaths.includes(req.path)) return next();

//   if(user) {
//     next();
//   } else{}
// }
const initApiRouters = (app) => {
  // router.get("/test-api", apiController.testApi);

  router.all("*", checkUserJWT, checkuserpermission);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);

  router.get("/account", userController.getUserAccount);

  router.get("/user/read", userController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  // role router
  router.get("/role/read", roleController.readFunc);
  router.post("/role/create", roleController.createFunc);
  router.put("/role/update", roleController.updateFunc);
  router.delete("/role/delete", roleController.deleteFunc);
  router.get("/role/by-group/:groupId", roleController.getRoleByGroup);

  router.get("/group/read", groupController.readFunc);

  return app.use("/api/v1/", router);
};

export default initApiRouters;
