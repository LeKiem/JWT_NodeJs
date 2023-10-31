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

const createNewUser = (email, password, username) => {
  let hasPass = hashPassword(password);
  connection.query(
    `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`,
    [email, hasPass, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      // console.log(results);
    }
  );
};
const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: "4000",
    user: "root",
    database: "jwt",
    Promise: bluebird
  });
  let users = [];
  try {
    const [rows, fields] = await connection.execute("Select * from users");
    return rows;
  } catch (error) {}
  //   users = connection.query(
  //     `SELECT * FROM users `,
  //     function (err, results, fields) {
  //       if (err) {
  //         console.log(err);
  //         return users;
  //       }
  //       users = results;
  //       return users;
  //     }
  //   );
};
module.exports = {
  createNewUser,
  getUserList
};
