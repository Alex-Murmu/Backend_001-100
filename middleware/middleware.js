const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model/user");


const protection = async(req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if(token && token.startsWith("Bearer")){
            token = token.split(" ")[1];
            const decoded = jwt.verify(token,process.env.jwtSecret);
            console.log({message:"userDeatil "},decoded);
            req.user = await Users.findById(decoded.id).select("password");
            next();
        }else{
            return res.status(401).json({message:"Invalid Token"});
        }
    } catch (error) {
        res.status(400).json({message:"erorr",detail:error.message});
    }
};


module.exports = protection;


