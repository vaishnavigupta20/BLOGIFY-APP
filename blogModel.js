// const { Schema, model } = require("mongoose");

// const blogSchema = new Schema({
//     title :{
//         type: String,
//         required: true,
//     },
//     body: {
//         type: String,
//         required: true,
//     },
//     coverImageURL: {
//         type: String,
//         required: false,
//     },
//     createdBy: {
//         type: Schema.Types.ObjectId,
//         ref: "user"
//     },
// }, {timestamps: true}
// );

// const Blog = model("blog", blogSchema);

// module.exports = Blog;


const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    body: {
      type: String,
      required: true,
      minlength: 10,
    },
    coverImageURL: {
      type: String,
      default: "/images/default_blog.jpg",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema);
module.exports = Blog;