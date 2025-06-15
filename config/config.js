const mongoose = require("mongoose");

const connection = async()=>{
 try {
    await mongoose.connect(process.env.DatabaseUrl);
    console.log("data base is ready")
 } catch (error) {
    console.log({message:"error",error:error});
 }
}

module.exports = connection;
