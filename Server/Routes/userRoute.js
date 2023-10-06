const { Router } = require("express");
const {
  register,
  login,
  setAvatar,
  allUsers,
  getUserPhoto,
} = require("../Controllers/userController");
const formidableMiddleware = require("express-formidable");
const router = Router();

// Route 1: This is to Register the user / METHOD: POST
router.post("/register", formidableMiddleware(), register);

// Route 2: This is to Login the user / METHOD: POST
router.post("/login", login);

// Route 3: This is to set Avatar / METHOD: PUT
router.put("/setAvatar/:id", setAvatar);

// Route 4: This is to get all the users excluding ourself / METHOD: GET
router.get("/allUsers/:id", allUsers);

// Route 5: This is to get the photo of the users / Method: GET
router.get("/user-photo/:id", getUserPhoto);

module.exports = router;
