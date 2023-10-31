const User = require("../model/User");
const fs = require("fs");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUserImage = async (req, res) => {
  const userID = req.params.userID;

  if (!userID) return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: userID }).exec();
  if (!user) {
    return res.status(204).json({ message: `User ID ${userID} not found` });
  }
  res.json(user.profileImg);
};

const deleteUserImage = async (req, res) => {
  if (!req?.body?._id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body._id }).exec();

  if (user) {
    user.profileImg = "";
    await user.save();
    console.log(`${user.username} picture was deleted`);
  } else {
    return res
      .status(204)
      .json({ message: `User ID ${req.body._id} not found` });
  }
};

const saveUserImage = async (req, res) => {
  const { _id, contentType } = req.body;
  try {
    if (!_id) return res.status(400).json({ message: "User ID required" });
    const user = await User.findOne({ _id }).exec();
    if (user) {
      user.profileImg = {
        data: fs.readFileSync("profImgUploads/" + req.file.filename),
        contentType,
      };
      await user.save();
      console.log(`${user.username} picture was updated`);
    } else {
      return res.status(204).json({ message: `User ID ${_id} not found` });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getAllUsers,
  deleteUser,
  saveUserImage,
  getUserImage,
  deleteUserImage,
};
