import mongoose from "mongoose";
import User from "../models/user.js";
import sendMail from "../emails/account.js";
import validator from "validator";
import nodemailer from "nodemailer"
import sendgridTransport from "nodemailer-sendgrid-transport";

// const sendEmail = async (user) => {
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "healthcaresystemse214@gmail.com",
//       pass: "nodejsflutter",
//     },
//   });
//   var mailOptions = {
//     from: "healthcaresystemse214@gmail.com",
//     to: user.email,
//     subject: "Email Verification",
//     html: `
//                 <h3>Thân gửi ${user.fullname},</h3>
//                 <p>Chân thành cảm ơn anh/chị đã dành thời gian đăng ký tài khoản của chúng tôi.</p>
//                 <p>Anh/chị vui lòng click vào địa chỉ dưới đây để hoàn thành việc đăng ký tài khoản.</p>
//                 <a target:"_blank" href="https://shiniapi.azurewebsites.net/auth/verifyEmail?emailToken=${user.emailToken}">Xác minh email</a>
//                 <br />
//                 <p><b>Trân trọng !!!<b></p>
//             `,
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//       return false;
//     } else {
//       return true;
//     }
//   });
// };


//verityEmail
export const verityEmail = async (req, res) => {
  const emailToken = req.query.emailToken;

  if (!emailToken) {
    return res.status(401).json({
      success: false,
      message: "EmailToken không chính xác.",
    });
  }

  const user = await User.findOne({ emailToken });

  if (!user)
    return res.status(401).json({
      success: false,
      message: "EmailToken không chính xác.",
    });

  try {
    let updatedUser = {
      emailToken: null,
      isVerifyEmail: true,
    };

    const infoUpdateCondition = { emailToken: emailToken };

    updatedUser = await User.findOneAndUpdate(
      infoUpdateCondition,
      updatedUser,
      { new: true }
    );

    if (!updatedUser)
      return res.status(401).json({
        success: false,
        message: "Tài khoản không tồn tại trong hệ thống.",
      });

    console.log(emailToken);

    res.json({
      success: true,
      message:
        "Tài khoản đã được xác minh, vui lòng đăng nhập và sử dụng dịch vụ.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống.",
    });
  }
};

///Login
export const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );
    res.send({ user });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// register user
export const registerUser = async (req, res) => {
  ///checking if email existed
  const emailExist = await User.findOne({ email: req.body.email }).exec();
  const randString = () =>{
    const len = 8
    let randStr = ''
    for (let i = 0; i < len; i++){
      const ch = Math.floor((Math.random() * 10) + 1)
      randStr += ch
    }
    return randStr
  }
  const uniqueString = randString()
  ///checking if email valid
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send("Invalid email")
  }

  if (emailExist)
    return res.status(400).send("Email already exists !");
  try {
    // Create a new user
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      uniqueString
    });

    ///Save User
    await newUser.save((error, data) => {
      res.status(200).json({ success: true, message: 'register success!', user: data })
    });
    sendMail(req.body.email, uniqueString);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống.",
    });
  }
};

export const signup = async (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // error occur
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    // if email is exist into database i.e. email is associated with another user.
    else if (user) {
      return res.status(400).send({ msg: 'This email address is already associated with another account.' });
    }
    // if user is not exist into database then save the user into database for register account
    else {
      // password hashing for save into databse
      // req.body.password = Bcrypt.hashSync(req.body.password, 10);
      // create and save user
      user = new User({ fullname: req.body.fullname, email: req.body.email, password: req.body.password });
    }
  });
};

export const verifyEmail = async (req, res) =>{
  // getting the string
  const {uniqueString } = req.params

  const user = await User.findOne({uniqueString: uniqueString})
  if(user){
    user.ifVerified =true
    await user.save()
    res.send("verify success")
  }else{
    res.send("user not found!!")
  }
}

///LoginWithFaceBook
export const loginWithFaceBook = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  try {
    if (!emailExist) {
      // Create a new user

      const newFBUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        avatar: req.body.avatar,
      });
      // Save the user
      await newFBUser.save();
      console.log(newFBUser);
    }
    //find the user
    const user = await User.findByCredentials(req.body.email);
    const token = await user.getToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống.",
    });
  }
};

// export const otpSignup = async (req, res, next) => {
//   const phoneExist = await User.findOne({ phoneNumber: req.body.phoneNumber });
//   console.log(phoneExist);
//   if (phoneExist) {
//     return res.status(400).send("Phone number already exists !");
//   } else {
//     createOtp(req.body, (error, results) => {
//       if (error) {
//         return next(error);
//       }
//       return res.status(200).send({
//         message: "Success",
//         data: results,
//       });
//     });
//   }
// };

export const logOut = async (req, res) => {
  try {
    console.log(req.user);
    req.user.tokens = req.user.tokens.filter((curToken) => {
      return curToken.token != req.token;
    });

    await req.user.save();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};