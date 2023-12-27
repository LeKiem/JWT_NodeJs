const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "data test"
  });
};

module.exports = {
  testApi
};
