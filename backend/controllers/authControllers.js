import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, contactNumber, role } =
      req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    };

    const lowerCaseEmail = email.toLowerCase();

    const exist = await User.findOne({ email: lowerCaseEmail });

    if (exist) return res.status(400).json({ message: "Email already exists!" });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    };

    await User.create({
      name,
      email: lowerCaseEmail,
      password,
      contactNumber,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const lowerCaseEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerCaseEmail });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    };

    const token = generateToken(user);

    res.cookie("auth_jwt", token, {
      httpOnly: true,
      secure: false, //for local devt
      sameSite: "Lax", //for local devt -- update if deploying?
      maxAge: 1000 * 60 * 60 * 3
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerCaseEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await resend.emails.send({
      from: "Lockatoo <onboarding@resend.dev>",
      to: user.email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes</p>
      `,
    });

    res.json({ message: "Reset link sent to email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("RESET ERROR:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
