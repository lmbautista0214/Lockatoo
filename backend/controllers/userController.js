import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

const readDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);

    if (!userData) {
      res.json({ error: "User details not found" });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const updateDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    const userData = await User.findByIdAndUpdate(id, newData);

    res.json(userData);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword.trim(), user.password);
    console.log("ismatch?", isMatch);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect old password",
        debug: {
          input: oldPassword,
          userId: req.user.id,
        },
      });

    user.password = newPassword;

    user.tokenVersion = user.tokenVersion + 1;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await User.findByIdAndDelete(id);

    res.json({ message: "Successfully deleted!" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export { readDetails, updateDetails, updatePassword, deleteUser };
