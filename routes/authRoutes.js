const express = require("express");
const {registerUser,login, getUserProfile, UpdateUserProfile} = require("../controler/authControler")
const router = express.Router();


router.post("/register",registerUser);
router.post("/login",login);
router.get("/getuser",getUserProfile);
router.post("/update",UpdateUserProfile);


module.exports = router;