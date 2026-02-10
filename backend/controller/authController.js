const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register controller
// @route POST api/v1/register


exports.register = async (req, res, next) => {
  try {
    // 1. Get data
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // --- NEW STEP: GENERATE TOKEN ---
    // We sign the token immediately using the new user's ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 3. Send Response (Now with Token)
    res.status(201).json({
      success: true,
      token, // <--- Send the token to the frontend
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      message: "User registered and logged in successfully",
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
