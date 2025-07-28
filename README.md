# BLOGIFY-APP
# 📝 Blogify – Full-Stack Blogging Platform

Blogify is a feature-rich blogging application built with Node.js, Express, MongoDB, and EJS. It allows users to securely sign up, create and view blogs with optional cover images, and explore posts submitted by others. Designed with a polished UI and modular backend, Blogify is perfect for developers who want a lightweight yet scalable blog engine.

---

## 🚀 Features

- 🔐 **User Authentication**  
  - Secure login and registration using JWT and HMAC password hashing  
  - Role-based access (`USER`, `ADMIN`) for enhanced routing control  

- 🗞️ **Blog Management**  
  - Create, read, and display blog posts  
  - Upload cover images using Multer  
  - Associate posts with authors via MongoDB references  

- 🧠 **Middleware & Routing**  
  - Custom auth middleware (`checkForAuthCookie`)  
  - Modular routing: `/user`, `/blog`  

- 📸 **Image Upload & Preview**  
  - Client-side preview before submission  
  - Optional fallback image for blogs without uploads  

- 🌐 **Responsive UI with Bootstrap 5**  
  - Clean navigation bar with dynamic links  
  - Cards layout for homepage blog thumbnails  
  - Conditional rendering based on authentication state  

---

## 💡 Tech Stack

| Layer                 | Technology                |
|-----------------------|---------------------------|
| Backend               | Node.js, Express.js       |
| Frontend Templating   | EJS                       |
| Database              | MongoDB, Mongoose         |
| Auth & Security       | JWT, Crypto               |
| File Uploads          | Multer                    |
| Styling               | HTML, CSS, Bootstrap 5    |
