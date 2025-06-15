
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/authRoutes");
const blogRoute = require("./routes/blogRoute")
app.use(express.json());
app.use(cors())
const connection =  require('./config/config')
require("dotenv").config();


app.use("/api/auth",authRoute);  // for authorization only
app.use("/api/",blogRoute)             /// signed user can watch the blog



app.listen(process.env.PORT,()=>{
    connection();
    console.log(`server is Runnign in Port http://localhost:${process.env.PORT}`)
})
