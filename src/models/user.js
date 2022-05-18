import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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
    isVerifiedEmail: {
      type: Boolean,
      default: false
    },
    uniqueString: {
      type: String
    },
    isSaveLogin: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    }
  },
  {
    timestamps: true,
    toJSON: {virtuals: true}
  }
);
// virual data in User 
userSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'likedBy'
})

userSchema.virtual('address', {
  ref: 'Address',
  localField: '_id',
  foreignField: 'idUser'
})

userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.uniqueString
  userObject.tokens = undefined
  return userObject
};

//Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

///Find User In the database
userSchema.statics.findByCredentials = async (email, password) => {
  let user = await User.findOne({ email });
  if (!user) {
    throw new Error( 'User does not exist')
  }
  if(password != null){
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw new Error( 'Password is not correct')
    }
  }else{
    throw new Error("Please enter your password")
  }
  if(user.isVerifiedEmail !== true){
    throw new Error("Your email haven't verified")
  }
  return user;
};

const User = mongoose.model("User", userSchema)
export default User;