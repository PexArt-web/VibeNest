const mongoose = require('mongoose');
const dataBase = process.env.DATABASE_URL;
module.exports = {
   connectDB : async (cb) => {
    try {
   const connectDatabase = await mongoose.connect(dataBase)
    return cb()
    } catch (error) {
        return cb(error);
    }
   }
}