const customerModel = require("./customerModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  console.log("V");

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new customerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    password: encryptedPassword,
    gender: req.body.gender,
  });

  await newUser
    .save()
    .then((result) => {
      res.status(201).json({
        msg: "Register Successfully...",
        user: result,
        status: 201
      });
    })
    .catch((err) => {
      res.status(500).json({
        msg: "You already Register",
        error: err,
      });
    });
};

exports.jwtLogin = async (req, res, next) => {
  try {
    const user = await customerModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
        status: 404,
      });
    }
    const result = await bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) {
        return res.status(400).json({
          msg: "password incorrect...",
          status: 400,
        });
      }

      if (result) {
        console.log(process.env.JWT_KEY);
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );

        return res.status(200).json({
          msg: "Auth Successfull...",
          status: 200,
          token: token,
        });
      }
      // res.status(401).json({
      //   msg:'Auth failed'
      // });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.adminLogin = (req, res, next) => {
  if (req.body.email == "admin@gmail.com" && req.body.password == "admin@123") {
    res.status(200).json({
      msg: "Admin Login Success...",
      status:200
    });
  } else {
    res.status(400).json({ 
      msg: "You are not Admin...",
      status: 400

    });
  }
};
