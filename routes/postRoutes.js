const express = require('express')
const postController = require('../controllers/postController')
const router = express.Router()
const isLoggedIn = require("../middleware/authMiddleware")

router.route("/")
.get(isLoggedIn,postController.getAllPosts)
.post(isLoggedIn,postController.createPost)
.delete(isLoggedIn,postController.deleteAllPost)

router.route("/:id")
.get(isLoggedIn,postController.getOnePost)
.patch(isLoggedIn,postController.updatePost)
.delete(isLoggedIn,postController.deletePost)

module.exports = router;