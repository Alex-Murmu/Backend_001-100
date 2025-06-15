const mongoose = require("mongoose");

const userShcema = new mongoose.Schema({
      name:{type:String,required:true},
      age:{type:Number},
      email:{type:String,required:true,unique:true},
      password:{type:String,required:true},
},{timestamps:true}
)


const Users = mongoose.model("Users",userShcema);
module.exports = Users;
