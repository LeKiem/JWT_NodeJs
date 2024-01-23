const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "data test",
  });
};
const handleRegister = (req, res) => {
  console.log("call me", req.body);
};
module.exports = {
  testApi,
  handleRegister,
};
