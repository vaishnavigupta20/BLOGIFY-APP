// const { Router } = require("express");
// const User = require("../models/userModel");

// const router = Router();

// router.get("/signin", (req, res) => {
//     res.render("signin");
// });

// router.get("/signup", (req, res) => {
//     res.render("signup");
// }); 

// router.post("/signin", async(req, res) => {
//     const {email, password} = req.body;
//     try {
//         const token = await User.matchPasswordAndGenerateToken(email, password);
//         res.cookie("token", token).redirect("/");
//     } catch (error) {
//         return res.render("signin", {
//             error: "Incorrect email or password"
//         })
//     }
// })

// router.get("/logout",(req, res) =>{
//     res.clearCookie("toekn").redirect("/");
// } )

// router.post("/signup", async (req, res) => {
//     const {fullName, email, password} = req.body;
//     await User.create({
//         fullName,
//         email,
//         password,
//     });
//     return res.redirect("/");
// });

// module.exports = router;


const { Router } = require("express");
const User = require("../models/userModel");

const router = Router();

// Render forms
router.get("/signup", (req, res) => {
    res.render("signup", { user: null });
});

router.get("/signin", (req, res) => {
    res.render("signin", { user: null });
});
// Sign in
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        res.cookie("token", token).redirect("/");
    } catch (error) {
        res.render("signin", {
            error: "Incorrect email or password",
            user: null,
        });
    }
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        await User.create({ fullName, email, password });
        res.redirect("/");
    } catch (err) {
        res.render("signup", {
            error: "Signup failed",
            user: null,
        });
    }
});

// Sign up
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await User.create({ fullName, email, password });
    res.redirect("/");
  } catch (err) {
    res.render("signup", { error: "Signup failed. Maybe email is taken?" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
