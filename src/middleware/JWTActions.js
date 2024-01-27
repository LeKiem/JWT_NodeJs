require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = () => {
  let payload = { mame: "bar", address: "HN" };
  let key = process.env.JWT_SERCRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
    console.log(token);
  } catch (error) {
    console.log(error);
  }
  //   console.log(token);
  return token;
};
const verifyToken = (token) => {
  let key = process.env.JWT_SERCRET;
  let data = null;

  try {
    let decode = jwt.verify(token, key);
    data = decode;
  } catch (err) {
    console.log(err);
  }
  return data;
};
module.exports = {
  createJWT,
  verifyToken,
};
