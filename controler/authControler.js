const Users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = async(userid)=>{
    return  jwt.sign({id:userid},process.env.jwtSecret,{expiresIn:"7d"});
}

const registerUser = async(req,res)=>{
    console.log("register Route hitted");
    try {
        const {name,age,email,password} = req.body;
        //check first if user is allready exsit in databse check email
        const ExistUser = await  Users.findOne({email:email});

        if(ExistUser){
         return res.status(401).json({message:"user Allready enrolled"});
        }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password,salt);

    const user = await Users.create({
        name:name,
        age:age,
        email:email,
        password:hashedpass
    });

    res.status(200).json({
        _id:user._id,
        name:user.name,
        age:user.age,
        email:user.email,
    });

    } catch (error) {
       res.status(401).json({message:"something wrong",error:error.message}) ;
    }
};


const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
  console.log("hit Login")
        // check existance of user email
        const user = await Users.findOne({email:email});
        if(!user){
                return res.status(400).json({message:"Sorry this Email is not Registered yet"});
         }
         const verifypassword = await bcrypt.compare(password,user.password);
         if(!verifypassword){
            return res.status(400).json({messageL:"Inavlid password"});
         }
         // if all ok then 
         res.status(200).json({
            _id:user._id,
            name:user.name,
            age:user.age,
            email:user.email,
            token: await generateToken(user._id)
         })
    } catch (error) {
        
    }
}

const getUserProfile = async(req,res)=>{
    try {
        const user = await Users.findById(req.user.id).select("-password");
        if(!user){
            return res.status(400).json({message:"user Not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message:"error Backend",error:error.message});
    }
}

const UpdateUserProfile = async(req,res)=>{
    try {
        const user = await Users.findById(req.user.id);
        if(!user){
            return res.status(401).json("User Not Found");
        }
         user.name = req.body.name || user.name;
         user.age  = req.body.age  || user.age;
         user.email = req.body.email || user.email;

         if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password,salt);
         }
         const updatedUser = await user.save();

         res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            age:updatedUser.age,
            email:updatedUser.email,
            token:generateToken(updatedUser._id)
         })
        
    } catch (error) {
        
    }
}
module.exports = {registerUser,login,getUserProfile,UpdateUserProfile};