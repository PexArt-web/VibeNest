require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT
const cors = require("cors");
const { connectDB } = require("../Config/database");
app.use(express.json());
app.use(cors());

const {log} = console

connectDB((error)=>{
    if(!error){
      const server =  app.listen(port, () => {
            log(`Server is running on port ${port}`);
            log("app and database connected successfully");
        });
        return
    }else{
        log("Error connecting to the database:", error);
    }
})
