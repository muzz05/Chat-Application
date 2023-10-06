const User = require("../Model/userModel");
const {
  hashPassword,
  verifyPassword,
} = require("../Utilities/PasswordProtection");
const fs = require("fs");

const register = async (req, res, next) => {
  try {
    const { username, email, password, isImageSet } = req.fields;
    const { image } = req.files;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username Already Used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email Already Used", status: false });
    }
    let user = new User({
      username,
      password: hashPassword(password),
      email,
      isImageSet,
    });
    if (image) {
      user.image.data = fs.readFileSync(image.path);
      user.image.contentType = image.type;
    } else {
      user.image = {};
    }
    user = await user.save();
    res.json({
      msg: "User Has Been Registered Successfully",
      status: true,
      user,
    });
  } catch (ex) {
    next(ex);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Username or Password Incorrect", status: false });
    }
    if (!verifyPassword(password, user.password)) {
      return res.json({ msg: "Username or Password Incorrect", status: false });
    }
    delete user.password;
    res.json({
      msg: "User Has Been Logged In Successfully",
      status: true,
      user,
    });
  } catch (ex) {
    next(ex);
  }
};

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
      "isImageSet",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

const getUserPhoto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("image");
    res.set("Content-type", user.image.contentType);
    res.status(200).send(user.image.data);
  } catch (ex) {
    next(ex);
  }
};
module.exports = { register, login, allUsers, getUserPhoto };
