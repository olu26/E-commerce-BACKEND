import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// route for user login
const loginUser = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false,message:"User not found"})
            
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            return res.json({success:true,token})
        }else{
         return res.json({success:false,message:"Invalid credentials"})

        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

// route for user register 

const registerUser = async (req,res)=>{
    try {
        const { name, email, password } = req.body
        // checking user already exists or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }
        // validating email format and strong password
        if (!validator.isEmail(email)) {
           return res.json({success:false,message:"enter valid email"})

        }
        if (password.length < 8) {
           return res.json({success:false,message:"enter a stronger password"})

        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)
        
        const newUser = new userModel({
            name,
            email,
            password:hashedpassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({success:true,token})
    


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// route for admin login
const adminLogin = async (req, res)=> {
    try {
         const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({email}, process.env.JWT_SECRET)
            
            return res.status(200).json({success:true, token})
            
        }else{
            return res.status(404).json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

export{loginUser,registerUser,adminLogin}