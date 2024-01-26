import groupService from "../service/groupService";

const readFunc = async (req, res) => {
  try {
    let data = await groupService.getGroups();
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
  // createFunc,
  // updateFunc,
  // deleteFunc,
};
