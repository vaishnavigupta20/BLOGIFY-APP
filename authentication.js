// const jwt = require("jsonwebtoken");

// const secret = "myBlog_App";
// function createTokenForUser(user) {
//     const payload = {
//         _id: user._id,
//         email: user.email,
//         profileImageURL: user.profileImageURL,
//         role: user.role,
//     };
//     const token = jwt.sign(payload, secret);
//     return token;
// }

// function validateToken(token) {
//     const payload = jwt.verify(token, secret);
//     return payload;
// }

// module.exports = {
//     createTokenForUser,
//     validateToken
// }



const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "myBlog_App";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

function validateToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { createTokenForUser, validateToken };