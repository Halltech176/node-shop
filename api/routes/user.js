const express = require("express");
const { request } = require("../../app");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

router.post("/signup", async (request, response, next) => {
  try {
    const users = await User.findOne({ email: request.body.email });
    if (!users) {
      const user = await User.create(request.body);
      response.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } else {
      throw "user with this email already exists";
    }
  } catch (err) {
    response.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

router.get("/signup", async (request, response, next) => {
  try {
    const user = await User.find().select("-password -__v");
    console.log(user);
    response.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    response.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

router.post("/login", async (request, response, next) => {
  const user = await User.findOne({ email: request.body.email });
  const comparePassword = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (user && comparePassword) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });
    const decode = jwtDecode(token);
    const cdate = new Date(decode.iat * 1000);
    const edate = new Date(decode.exp * 1000);
    // console.log(cdate, edate);
    console.log(user);
    response.status(200).json({
      status: "success",
      message: "user successfully logged in",
      token,
    });
  } else {
    response.status(404).json({
      status: "fail",
      message: "please input a valid email address or password",
    });
  }
});

router.delete("/delete/:userId", async (request, response, next) => {
  const id = request.params.userId;
  const users = await User.findById(id);
  if (users) {
    const user = await User.findByIdAndDelete(id);
    response.status(200).json({
      status: "success",
      message: "user successfully deleted",
    });
  } else {
    response.status(404).json({
      status: "fail",
      message: "user does not exist",
    });
  }
});
module.exports = router;
