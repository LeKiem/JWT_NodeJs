import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models";
// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   port: "4000",
//   user: "root",
//   database: "jwt"
// });
const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hasPass = hashPassword(password);

  try {
    await db.User.create({
      username: username,
      email: email,
      password: hasPass
    });
  } catch (error) {
    console.log(error);
  }
};
const getUserList = async () => {
  let users = [];
  users = await db.User.findAll();
  return users;
  // const connection = await mysql.createConnection({
  //   host: "127.0.0.1",
  //   port: "4000",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird
  // });
  // try {
  //   const [rows, fields] = await connection.execute("Select * from user");
  //   return rows;
  // } catch (error) {}
};
const deleteUser = async (usesId) => {
  await db.User.destroy({
    where: { id: usesId }
  });

  // const connection = await mysql.createConnection({
  //   host: "127.0.0.1",
  //   port: "4000",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "Delete  from user WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {}
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id }
  });
  return user.get({ plain: true });
  // const connection = await mysql.createConnection({
  //   host: "127.0.0.1",
  //   port: "4000",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "Select *  from user WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(error);
  // }
};

const updateUserInfo = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: { id: id }
    }
  );
  // const connection = await mysql.createConnection({
  //   host: "127.0.0.1",
  //   port: "4000",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user SET email = ? , username = ? WHERE id =? ",
  //     [email, username, id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(error);
  // }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo
};
