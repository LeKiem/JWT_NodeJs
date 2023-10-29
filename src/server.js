import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
require("dotenv").config();

const app = express();

configViewEngine(app);
initWebRouters(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("JWT Backend is running on the port = " + PORT);
});
