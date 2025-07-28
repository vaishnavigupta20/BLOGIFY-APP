
const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

const router = Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.resolve("./public/uploads")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Guard: ensure user is signed in
function requireAuth(req, res, next) {
  if (!req.user) return res.redirect("/user/signin");
  next();
}

// Show “Add New Blog” form
router.get("/add-new", requireAuth, (req, res) => {
  res.render("addBlog", { user: req.user });
});

// View a single blog
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId : req.params.id}).populate("createdBy");
  console.log(comments);
  
  res.render("blog", {
    user: req.user,
    blog,
    comments,
   });
});

router.post("/comment/:blogId", async(req, res) => {
   await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
})

// Handle form POST
router.post("/", requireAuth, upload.single("coverImg"), async (req, res) => {
  const { title, body } = req.body;
  const coverImagePath = req.file
    ? `/uploads/${req.file.filename}`
    : "/images/default_blog.jpg";

  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: coverImagePath,
  });

  res.redirect(`/blog/${blog._id}`);
});

module.exports = router;