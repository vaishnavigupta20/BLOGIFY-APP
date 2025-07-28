// const { createHmac, randomBytes } = require("crypto")
// const { Schema, model } = require("mongoose");

// const {createTokenForUser} = require("../services/authentication");

// const userSchema = new Schema ({
//     fullName: {
//     type: String,
//     required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     salt: {
//         type: String,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     profileImageURL : {
//         type: String,
//         default: "/public/images/default.png",
//     },
//     role: {
//         type : String,
//         enum: ["USER", "ADMIN"],
//         default: "USER",
//     },
// },
//     {timestamps: true}
// );

// userSchema.pre("save", function (next){
//     const user = this;
//     if(!user.isModified("password")) return;

//     const salt = randomBytes(16).toString();
//     const hashedPwd = createHmac("sha256", salt)
//     .update(user.password)
//     .digest("hex");
//     this.salt = salt;
//     this.password = hashedPwd;

//     next();
// });

// userSchema.static("matchPasswordAndGenerateToken", async function (email, password){
//     const user = await this.findOne({email});
//     if(!user) throw new Error("User not found");

//     const salt = user.salt;
//     const hashedPwd = user.password;
//     const userHash =  createHmac("sha256", salt)
//     .update(password)
//     .digest("hex");
    
//     if(hashedPwd !== userHash) throw new Error("Incorrect password");
    
//     const token = createTokenForUser(user);
//     return token;
// })

// const User = model("user", userSchema);

// module.exports = User;


const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImageURL: {
      type: String,
      default: "/images/default_profile.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPwd = createHmac("sha256", salt).update(this.password).digest("hex");

  this.salt = salt;
  this.password = hashedPwd;
  next();
});

// Static: verify credentials & generate JWT
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const userHash = createHmac("sha256", user.salt).update(password).digest("hex");
  if (userHash !== user.password) throw new Error("Incorrect password");

  return createTokenForUser(user);
});

const User = model("user", userSchema);
module.exports = User;