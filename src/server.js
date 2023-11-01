import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection();

initWebRouters(app);

app.listen(PORT, () => {
  console.log("JWT Backend is running on the port = " + PORT);
});
