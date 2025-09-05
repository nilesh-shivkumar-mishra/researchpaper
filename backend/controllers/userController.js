import validator from "validator"; // validator package for email and password
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//user login
const loginUser = async(req,res)=>{
        try {
          const {email,password} = req.body;

          const user = await userModel.findOne({email});

          if (!user) {
            return res.json({success:false, message:"User doesn't exists"})
          }

          const isMatch = await bycrypt.compare(password,user.password); // user is define upside

          if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true , token})
          }
          
          else{
            res.json({success:false , message:'Invalid credentials'})
          }

        } catch (error) {
          console.log(error);
          res.json({success:false , message:error.message})
        }
}


//user register
const registerUser = async(req,res)=>{
  try {
    const {name,email,password} = req.body;

    const exists = await userModel.findOne({email})

    // checking user is alredy exists or not

    if(exists){
      return res.json({success:false, message:'User already exist'})
    }

     // validating email format and storng password

    if (!validator.isEmail(email)) {
      return res.json({success:false, message:'Please enter a valid email'})
    }

    if (password.length < 8) {
      return res.json({success:false, message:'Please enter a strong password'})
    }

    // hasing user password
    
    const salt = await bycrypt.genSalt(10)
    const hashedPassword = await bycrypt.hash(password,salt)

    // storing in the form of userModel
    const newUser = new userModel({
      name,
      email,
      password:hashedPassword
    })


     const user = await newUser.save()// step 1

     const token = createToken(user._id)// step2

     res.json({success:true,token})
     

  } catch (error) {
     console.log(error);
     res.json({success:false , message:error.message})
  }
}

//admin login
const adminLogin = async(req,res)=>{
  
 try {
  
     const {email,password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       const token = jwt.sign(email+password,process.env.JWT_SECRET);
       res.json({success:true,token})
    }
    else{
    res.json({success:false,message:"Invalid credentials"})
    }

 } catch (error) {
      console.log(error);
      res.json({success:false , message:error.message})
 }
}


export {loginUser,registerUser,adminLogin}