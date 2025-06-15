# 🧠 Backend_001-100

A basic Node.js backend project where users can **sign up**, **sign in**, **update their profile**, and **create or update blogs**. Built with **Express**, **MongoDB**, and **JWT-based authentication**.

---

## 🚀 Features

- ✅ User Signup (Register)
- ✅ User Signin (Login with JWT)
- ✅ Update User Profile (Name, Age, Email — not password)
- ✅ Create Blog Post
- ✅ Update Blog Post
- 🛡️ Protected routes using JWT Middleware

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JSON Web Tokens (JWT)
- **Validation**: Express middleware
- **Environment Config**: dotenv

---

## 📂 Folder Structure

backend/
├── config/ # Database connection
├── controller/ # Auth and blog logic
├── middleware/ # Auth middleware (JWT)
├── model/ # Mongoose schemas
├── routes/ # Route definitions
├── .env # Environment variables
├── .gitignore
├── server.js # Entry point


---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/Alex-Murmu/Backend_001-100.git
   cd Backend_001-100
```

2. **Install dependencies**
  ```bash
npm install
```
3 **.Create a .env file in the root directory**
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```


4.**Start the server**
```bash 
npm run dev   # If using nodemon
```
