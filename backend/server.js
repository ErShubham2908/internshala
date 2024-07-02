
const express = require("express");
const cors = require("cors");
const appServer = express();
const dotENV = require("dotenv");
const { mongooseConnection } = require("./config/mongooseConnection");
const { authRoutes } = require("./router/auth.routes");
const { userRoutes } = require("./router/user.routes");
dotENV.config();

const PORT = process.env.PORT || 8080;

appServer.use(express.json());
appServer.use(
  cors({
    origin: "*",
  })
);
appServer.use("/api/v1/auth", authRoutes)
appServer.use("/api/v1/user", userRoutes)

appServer.listen(PORT, async () => {
  try {
    await mongooseConnection();
    console.log(`SERVER STARED  : http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.log(`SOMETHING WENT WRONG : ${err}`);
  }
});