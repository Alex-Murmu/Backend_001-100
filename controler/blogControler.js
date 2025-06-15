

const Blog = require("../model/blog");
const Users = require("../model/user");

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

const createBlogPost = async(req,res)=>{
    try {
        const {name} = await Users.findById(req.user.id);
        const {title,content} = req.body

        if(!title && !content && !author){
          return res.status(400).json("Something Is missing");
        }

        const blog = await Blog.create({
            title:title,
            content:content,
            author:name,
            createdBy:req.user.id,
        })

        res.status(200).json({
            title:blog.title,
            content:blog.content,
            author:blog.author,
        })

    } catch (error) {
        res.status(200).json({message:error.message,mess:"adas"});
    }
}

const updateBlogPost = async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.id; // Comes from authentication middleware (JWT, session, etc.)
    const { title, content } = req.body;

    try {
        // Step 1: Find the blog by ID
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Step 2: Check if the blog was created by this user
        if (blog.createdBy.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to update this blog" });
        }

        // Step 3: Update fields if allowed
        if (title) blog.title = title;
        if (content) blog.content = content;

        await blog.save();

        res.status(200).json({ message: "Blog updated successfully", blog });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getAllBlogs , createBlogPost, updateBlogPost };
