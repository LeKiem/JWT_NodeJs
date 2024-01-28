require("dotenv").config();
import jwt from "jsonwebtoken";
const nonSecurePaths = ["/logout", "/register", "/login"];
const createJWT = (payload) => {
  //   let payload = { mame: "bar", address: "HN" };
  let key = process.env.JWT_SERCRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPINES_IN });
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
const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.cookies;
  const tokenFromHeader = extractToken(req);
  if ((cookies && cookies.jwt) || tokenFromHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
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

    // console.log("jwt:", cookies.jwt);
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
    let canAccess = roles.some(
      (item) => item.url === currentUrl || currentUrl.includes(item.url)
    );
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
