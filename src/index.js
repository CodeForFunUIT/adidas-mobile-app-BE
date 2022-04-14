import express from "express";
import http from "http";
import connectDB from "./db/mongooes.js";
import dotenv from "dotenv";
import authRouter from "./routers/auth_router.js"
import userRouter from "./routers/user_router.js"
import uploadRouter from "./routers/upload_router.js"
import productRouter from "./routers/product_router.js"
import imageRouter from "./routers/image_router.js"
const app = express();
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
  
  const port = process.env.PORT
  server.listen(port, () => {
    console.log(`Server API listening at http://192.168.1.145:${port}`);
  });