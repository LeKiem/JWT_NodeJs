require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import initApiRouters from "./routes/api";
import configCors from "./config/cors";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

//Config Cors
configCors(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

connection();

//test jwt
// createJWT();
// let decodeData = verifyToken(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYW1lIjoiYmFyIiwiYWRkcmVzcyI6IkhOIiwiaWF0IjoxNzA2MzU4MTI3fQ.Z_VKh3r0F7QzFAcgeGqzcDKJXfiqfo1CnFNI0BitCPU"
// );

// console.log(decodeData);

initWebRouters(app);
initApiRouters(app);
app.use((req, res) => {
  return res.send("404");
});
app.listen(PORT, () => {
  console.log("JWT Backend is running on the port = " + PORT);
});
