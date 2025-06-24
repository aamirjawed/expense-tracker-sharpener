const path = require("path");
const db = require("../utils/db-connection");
const bcrypt = require('bcryptjs')
const {User} = require("../models/userModel")

const sentSignForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10)

 
  try {
    const user = await User.create({name:name, email:email, password:hashedPassword})

    if(!user){
      res.status(500).json({message:"Error creating user"})
    }

    res.status(200).json({message:`User with ${name} has been created`})
  } catch (error) {
    console.log("User sign up error:", error);
    res.status(500).json({message:"Server side error while creating user"})
  }
};


const sentLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
 
  
  try {
    const user = await User.findOne({where:{email}})

    if(!user){
      return res.status(400).json({message:`User with ${email} not found`})
    }

    const isMatch = bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(401).json({message:'Invalid email or password'})
    }

    res.status(200).json({message:"Login successful", user})
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
 
};

module.exports = { userSignup, sentSignForm, sentLoginPage, userLogin };
