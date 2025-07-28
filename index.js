// const express = require("express");
// const path = require("path");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");

// const Blog = require("./models/blogModel")
// const {checkForAuthCookie} = require("./middlewares/authMiddleware")

// const userRoute = require("./routes/userRoute");
// const blogRoute = require("./routes/blogRoute");

// const app = express();
// const port = 70;

// mongoose.connect("mongodb://127.0.0.1/blogify").then(() => {
//     console.log("MongoDB Connected");
// })

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

// app.use(express.urlencoded({extended : false}));
// app.use(cookieParser());
// app.use(checkForAuthCookie("token"));
// app.use(express.static(path.resolve("./public")))

// app.get("/", async (req, res) => {
//     const allBlogs = await Blog.find({});
//     res.render("home", {
//         user: req.user,
//         blogs: allBlogs,
//     })
// });

// app.use("/user", userRoute);
// app.use("/blog", blogRoute);

// app.listen(port, ()=>{
//     console.log(`Server started at port ${port}`);
// });


require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blogModel");
const { checkForAuthCookie } = require("./middlewares/authMiddleware");

const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

const app = express();
const port = process.env.PORT || 70;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/blogify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")));

// Home route: list blogs sorted by newest first
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

// Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

// Start server
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});