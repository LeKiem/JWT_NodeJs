require("dotenv").config();
import jwt from "jsonwebtoken";
const nonSecurePaths = ["/", "/register", "/login"];
const createJWT = (payload) => {
  //   let payload = { mame: "bar", address: "HN" };
  let key = process.env.JWT_SERCRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
    // console.log(token);
  } catch (error) {
    console.log(error);
  }
  //   console.log(token);
  return token;
};
const verifyToken = (token) => {
  let key = process.env.JWT_SERCRET;
  let decode = null;

  try {
    decode = jwt.verify(token, key);
  } catch (err) {
    console.log(err);
  }
  return decode;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decode = verifyToken(token);

    if (decode) {
      req.user = decode;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticaed the user",
      });
    }

    console.log("jwt:", cookies.jwt);
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticaed the user",
    });
  }
};
const checkuserpermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();

  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles.Roles;
    let currentUrl = req.path;
    if (!roles || roles.lenght === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: `You don't permission to access this resource...`,
      });
    }
    let canAccess = roles.some((item) => item.url === currentUrl);
    if (canAccess == true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: `You don't permission to access this resource...`,
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticaed the user",
    });
  }
};
module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkuserpermission,
};
