import mongoose from "mongoose";
import User from "../models/user.js";
import validator from "validator";

const sendEmail = async (user) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "healthcaresystemse214@gmail.com",
      pass: "nodejsflutter",
    },
  });
  var mailOptions = {
    from: "healthcaresystemse214@gmail.com",
    to: user.email,
    subject: "Email Verification",
    html: `
                <h3>Thân gửi ${user.fullname},</h3>
                <p>Chân thành cảm ơn anh/chị đã dành thời gian đăng ký tài khoản của chúng tôi.</p>
                <p>Anh/chị vui lòng click vào địa chỉ dưới đây để hoàn thành việc đăng ký tài khoản.</p>
                <a target:"_blank" href="https://shiniapi.azurewebsites.net/auth/verifyEmail?emailToken=${user.emailToken}">Xác minh email</a>
                <br />
                <p><b>Trân trọng !!!<b></p>
            `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      return true;
    }
  });
};


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
    const token = await user.getToken();
    res.send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// register user
export const registerUser = async (req, res) => {
  ///checking if email existed
  const emailExist = await User.findOne({ email: req.body.email}).exec();
  
  ///checking if email valid
  if(!validator.isEmail(req.body.email)){
    return res.status(400).send("Invalid email")
  }

  if (emailExist)
    return res.status(400).send("Email already exists !");
  ///Generate EmailToken if SignUp With Email
  try {
    // Create a new user
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    });

    ///Save User
    await newUser.save((error, data) =>{
      res.status(200).json({success: true, message: 'register success!', user: data})
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống.", 
    });
  }
};

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