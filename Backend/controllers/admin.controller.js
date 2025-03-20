const userModel = require("../models/admin.model")
const {validationResult} = require("express-validator")


module.exports.registerUser = async(req,res)=>{ 


    const {firstname,lastname,company, email, password} = req.body
    
    const isUserExist = await userModel.findOne({email})
    if(isUserExist){
        return res.status(400).json({message: "User already exists"})
    }

    const hashedPassword = await userModel.hashPassword(password)
    const user = await userModel.create({
        firstname,
        lastname,
        email,
        password : hashedPassword,
        company
        
    })

    const token = user.generateAuthToken()  // ✅ Use the user instance
    res.status(201).json({token, user})
}

module.exports.loginUser = async function(req,res){

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}) //return error
    }

    const prevToken = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(prevToken){
        res.clearCookie("token")
    }

    const {email,password} = req.body
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        
        return res.status(401).json({message: "Invalid Email or Password"}) //return error
    }
    const isValidPassword = await user.comparePassword(password,user.password)
    if(!isValidPassword){
        return res.status(401).json({message: "Invalid Email or Password"}) //return error
    }
    const token = user.generateAuthToken()
    res.cookie("token", token, {
        secure: false, // Secure in development
        httpOnly: true,
      });
    res.status(200).json({token, user})

}

module.exports.getProfile = async (req,res)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req,res)=>{
    const token = req.cookies.token|| req.headers.authorization.split(" ")[1]
    res.clearCookie("token")
    res.status(200).json({message: "Logged Out Successfully"})
}

module.exports.allUsers = async (req,res)=>{
    const keyword = req.query.search?{
        $or:[
            {
                name:{
                    $regex:req.query.search,
                    $options:"i",
                }
            },
            {
                email:{
                    $regex:req.query.search,
                    $options:"i",
                }
            }
        ]
    }:{}

    const users = await userModel.find(keyword).find({_id:{$ne:req.user._id}})
    res.send(users)
    
}