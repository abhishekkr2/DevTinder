const mongoose=require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(
    "mongodb+srv://krabhi688_db_user:nT2eFEJcO4KT8jOZ@cluster0.noitgxz.mongodb.net/devTinder");
};

module.exports=connectDB;

