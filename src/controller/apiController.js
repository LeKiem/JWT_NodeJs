import loginRegisterService from "../service/loginRegisterService";
const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "data test",
  });
};
const handleRegister = async (req, res) => {
  console.log("call me", req.body);
  try {
    // req.body
    // email,
    // phone,
    // username,
    // password,
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: 1, //
        DT: "",
      });
    }
    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters",
        EC: 1, //
        DT: "",
      });
    }

    // service
    let data = await loginRegisterService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "eror from server",
      EC: -1, //
      DT: "",
    });
  }
};
module.exports = {
  testApi,
  handleRegister,
};
