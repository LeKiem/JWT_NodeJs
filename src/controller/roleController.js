import roleApiService from "../service/roleApiService";
const readFunc = async (req, res) => {
  try {
    let data = await roleApiService.getAllRoles();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "eror from server",
      EC: -1, //
      DT: "",
    });
  }
};
const createFunc = async (req, res) => {
  try {
    let data = await roleApiService.createNewRoles(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "eror from server",
      EC: -1, //
      DT: "",
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    console.log("Cookies: ", req.cookies);
    let data = await roleApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "eror from server",
      EC: -1, //
      DT: "",
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    let data = await roleApiService.deleteRole(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "eror from server",
      EC: -1, //
      DT: "",
    });
  }
};

const getRoleByGroup = async (req, res) => {
  try {
    let id = req.params.groupId;
    let data = await roleApiService.getRoleByGroup(id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "eror from server",
      EC: -1, //
      DT: "",
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getRoleByGroup,
};
