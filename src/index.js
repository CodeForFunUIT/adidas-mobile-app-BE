import express from "express";
import http from "http";
import connectDB from "./db/mongooes.js";
import dotenv from "dotenv";
import authRouter from "./routers/auth_router.js"
import userRouter from "./routers/user_router.js"
import uploadRouter from "./routers/upload_router.js"
import productRouter from "./routers/product_router.js"
import imageRouter from "./routers/image_router.js"
import categoryRouter from "./routers/category_router.js"
import bannerRouter from "./routers/banner_router.js"
// import socket from "socket.io"
const app = express();
// socket.createServer(app)

const server = http.createServer(app);
app.use(express.json({ limit: "50mb", extended: true }));

dotenv.config()

connectDB();

//#region setup routes
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/upload", uploadRouter)
app.use("/product", productRouter)
app.use("/image",imageRouter)
app.use("/category",categoryRouter)
app.use("/banner",bannerRouter),
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
  // 172.16.2.112
  const port = process.env.PORT
  server.listen(port, () => {
    console.log(`Server API listening at http://10.45.148.90:${port}`);
  });