import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

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
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: "4000",
    user: "root",
    database: "jwt",
    Promise: bluebird
  });
  try {
    const [rows, fields] = await connection.execute(
      `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`,
      [email, hasPass, username]
    );
  } catch (error) {
    console.log(error);
  }
};
const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: "4000",
    user: "root",
    database: "jwt",
    Promise: bluebird
  });
  try {
    const [rows, fields] = await connection.execute("Select * from users");
    return rows;
  } catch (error) {}
};
const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: "4000",
    user: "root",
    database: "jwt",
    Promise: bluebird
  });
  try {
    const [rows, fields] = await connection.execute(
      "Delete  from users WHERE id=?",
      [id]
    );
    return rows;
  } catch (error) {}
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: "4000",
    user: "root",
    database: "jwt",
    Promise: bluebird
  });
  try {
    const [rows, fields] = await connection.execute(
      "Select *  from users WHERE id=?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: "4000",
    user: "root",
    database: "jwt",
    Promise: bluebird
  });
  try {
    const [rows, fields] = await connection.execute(
      "UPDATE users SET email = ? , username = ? WHERE id =? ",
      [email, username, id]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo
};
