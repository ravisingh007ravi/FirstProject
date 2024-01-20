const express=require("express")
const router=express.Router()
const {creatUser, login}=require("../controllers/userController.js")
const {CreateMember} = require("../controllers/memberController.js")
const {EarningMember} = require("../controllers/earningController.js")
const { authentication, authorization } = require("../middleware/auth.js");

//=====================================================User========================================================================
router.post("/register",creatUser)
router.post("/Member",CreateMember)
router.post("/Earning",EarningMember)
router.post("/Login", authentication, authorization, login);

module.exports = router;