const express = require("express");
const { getAllBlogs, createBlogPost, updateBlogPost } = require("../controler/blogControler");
const protection = require("../middleware/middleware")

const router = express.Router();


router.get("/blog",protection,getAllBlogs);
router.post("/blog",protection,createBlogPost);
router.post("/updateBlog/:id",protection,updateBlogPost);



module.exports = router;
