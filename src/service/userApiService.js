import db from "../models/index";
import {
  checkEmailExits,
  checkPhoneExits,
  hashUserPassword,
} from "./loginRegisterService";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
      nest: true,
    });
    if (users) {
      //   console.log(users);
      //   let data = users.get({ plain: true });
      return {
        EM: "get data success1",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success2",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      order: [["id", "DESC"]],
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    // console.log(data);
    return {
      EM: "OK",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};
const createUser = async (data) => {
  try {
    let isEmailExist = await checkEmailExits(data.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist!",
        EC: 1,
        DT: [],
      };
    }
    let isPhoneExist = await checkPhoneExits(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already exist!",
        EC: 1,
        DT: "email",
      };
    }
    // hash user password
    let hashPassword = hashUserPassword(data.password);
    // data.password = hashPassword;
    await db.User.create({ ...data, password: hashPassword });
    return {
      EM: "OK",
      EC: 0,
      DT: "phone",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "Error with empty GroupId",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "Update Success",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "User not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "Delete user success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
