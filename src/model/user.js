// created user schema and usermodel

const mongoose = require("mongoose");
var validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 15,
    },

    lastName: {
      type: String,
      maxLength: 15,
    },

    emailID: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email: " + value);
        }
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    age: {
      type: Number,
      default: 25,
      min: 18,
    },

    gender: {
      type: String,
      default: "male",
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender not valid");
        }
      },
    },

    skills: {
      type: [String],
      default: [],
    },

    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // default avatar
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return token;
};
const User = mongoose.model("user", userSchema);

module.exports = User;
