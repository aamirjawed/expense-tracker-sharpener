const path = require("path");
const db = require("../utils/db-connection");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); 

const sentSignForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const existingEmail =await User.findOne({where:{email}});

  if(existingEmail){
    return res.status(409).json({message:"This email already exists"})
  }

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
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign({ id: user.id }, '34398fdjhf9e8r398', { expiresIn: '1h' });

    
    return res.status(200).json({
      message: "Login successful",
      token  
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};


const getUserDetailsWithId = async (req, res) => {
  try {
    const {id} = req.params;
    const user  = await User.findByPk(id);

    if(!user){
      return res.status(404).json({message:`User not found`})
    }

    res.status(200).json(user)
  } catch (error) {
    console.log("Server side error with finding user")
    res.status(500).json({message:"Server error"})
  }
}


const deleteUserWithId = async(req,res) => {
  try {
    const {id}  = req.params;
    const user = await User.findByPk(id);

    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    res.status(200).json(user)
  } catch (error) {
    console.log("Server error while deleting user")
    res.status(500).json({message:"Server error delete user"})
  }
}
module.exports = { userLogin };

module.exports = { userSignup, sentSignForm, sentLoginPage, userLogin , getUserDetailsWithId, deleteUserWithId};
