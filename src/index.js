import express from "express";
import http from "http";
import connectDB from "./db/mongooes.js";
import dotenv from "dotenv";
const app = express();
const server = http.createServer(app);

import authRouter from "./routers/auth_router.js"
import userRouter from "./routers/user_router.js"

app.use(express.json({ limit: "50mb", extended: true }));

dotenv.config({path: '../config/config.env'})

connectDB();



//#region setup routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
//#endregion

app.use((req, res, next) => {
    const error = new Error("NOT FOUND!");
    error.status = 403;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
      msg: "INVALID DATA!",
      detail: error.message,
    });
  });
  
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server API listening at http://localhost:${port}`);
  });