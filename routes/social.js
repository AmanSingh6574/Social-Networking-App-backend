
const express = require("express") ; 
const router = express.Router() ; 

const {auth} = require("../middlewares/auth")
const {addPost , getallpost , VoteFunc  , deletePost} = require("../controllers/social") ; 

router.post("/post" , auth , addPost)
router.put('/vote' , auth , VoteFunc )
router.get("/allpost" , getallpost)
router.delete("/delete/:id" , deletePost )

module.exports = router 