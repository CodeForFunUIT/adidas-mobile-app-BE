import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
    //   required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 7,
      validate: (value) => {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password must not contain 'password'");
        }
        if (value.trim().includes(" "))
          throw new Error("Password must not contain space");
      },
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true,
      index: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      }
    },
    // avatar: {
    //   type: String,
    //   default: "res/user/61adf0b6ebf4bed8d7eb2dd3/1639401886935-image_picker2365397458419136845.jpg"
    // },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  userObject.tokens = undefined;
  return userObject;
};

///Find User In the database
userSchema.statics.findByCredentials = async (email, password) => {
  let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist")
    }
  if(password!=null){
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new Error("Password is not correct");
  }}
  return user;
};

const User = mongoose.model("User", userSchema)
export default User;