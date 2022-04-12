import express from "express";
import http from "http";
import connectDB from "./db/mongooes.js";
import dotenv from "dotenv";
import authRouter from "./routers/auth_router.js"
import userRouter from "./routers/user_router.js"
import uploadRouter from "./routers/upload_router.js"
import multer from "multer"

const app = express();
const server = http.createServer(app);
const upload = multer({
  dest: 'images'
})
app.post('/upload', upload.single('upload'), (req, res) =>{
  res.send(200)
})
app.use(express.json({ limit: "50mb", extended: true }));

dotenv.config({path: '../config/config.env'})

connectDB();



//#region setup routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/upload", uploadRouter);
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
    console.log(`Server API listening at http://192.168.1.145:${port}`);
  });