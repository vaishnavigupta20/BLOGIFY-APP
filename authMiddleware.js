// function checkForAuthCookie(cookieName) {
//     return (req, res, next) => {
//         const tokenCookieValue = req.cookies[cookieName];
//         if(!tokenCookieValue){
//            return  next();
//         }

//         try {
//             const userPayload = validateToken(tokenCookieValue);
//             req.user = userPayload;
//         } catch (error) {}
//         return next();
//     };
// }


// module.exports = {
//     checkForAuthCookie,
// }


const { validateToken } = require("../services/authentication");

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();

    try {
      const userPayload = validateToken(token);
      req.user = userPayload;
    } catch (err) {
      console.warn("Invalid auth token:", err.message);
    }
    next();
  };
}

module.exports = { checkForAuthCookie };