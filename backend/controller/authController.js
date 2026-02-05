const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register controller
// @route POST api/v1/register
exports.register = async (req, res, next) => {
  try {
    //1. getting the data from the request
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    
    //2. creating the user in the database
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      id: user._id,
      email: user.email,
      message: "user registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};



//@desc Login controller
//@route POST api/v1/login

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please enter email and password",
      });
    }

    // 2. find user + include password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    // 3. compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    //send the token here
    //jwt.sign(payload,secret key, options )
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 4. success login
    res.status(200).json({
      success: true,
      message: "Login successful (token will be sent)",
      token,
    });
    

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
