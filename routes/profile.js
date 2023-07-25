const express = require("express") ; 
const router = express.Router() ; 
const { auth } = require("../middlewares/auth")


const { getUserProfile , updateUserProfile } = require("../controllers/profile");

router.get("/getuserProfile" , auth ,  getUserProfile ) ;  
router.put("/profileUpdate", auth, updateUserProfile)
module.exports = router 