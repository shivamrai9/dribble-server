import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modals/userModel.js";
const KEY = "mysecretkey";
const saltRounds = 10;

const authController = {
 
  register: async (req, res) => {
    try {
      let { userName, name, email, password } = req.body;
      let userExists = await User.findOne({ email: email });
      let userNameExists = await User.findOne({ userName: userName });
      if (userExists) {
        return res.status(400).json({ message: "Email already exists" });
      } 
      if (userNameExists) {
        return res.status(400).json({ message: "Username already exists" });
      }
      else {
        bcrypt.genSalt(saltRounds, async function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              return res.status(400).json({ message: "Failed to register user" });
            } else {
              let createUser = await User.create({ userName, name, email, password: hash });
              return res.status(201).json({ message: "User registered successfully" });
            }
          });
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    // Login logic
    try {
      let { email, password, remember = false } = req.body;
      let userExists = await User.findOne({ email: email });
      if (userExists) {
        bcrypt.compare(password, userExists.password, function (err, result) {
          if (result) {
            let payload = {
              id: userExists._id,
            };
            let token = jwt.sign(payload, KEY, {
              expiresIn: remember ? "365d" : "1h",
            });
            return res.status(200).json({ token, exp: remember ? "365D" : "1H" });
          } else {
            return res.status(400).json({ message: "wrong password" });
          }
        });
      } else {
       return res.status(404).json({ message: "no user found" });
      }
    } catch (error) {}
  },

  // logout: async (req, res) => {
  //   // Logout logic
  // },

  // resetPassword: async (req, res) => {
  //   // Password reset logic
  // },

  // forgotPassword: async (req, res) => {
  //   // Forgot password logic
  // },

  // verifyOTP: async (req, res) => {
  //   // OTP verification logic
  // }
};

export default authController;
