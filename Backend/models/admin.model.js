const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name must be atleast 3 characters long"]
        },
        lastname:{
            type:String,
        },
    
    email:{
        type : String,
        required:true,
        unique:true,
        minlength:[11,"email must be atleast 11 characters long"],
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    company:{
        type:String,
        required:true,
        minlength:[3,"Company name must be atleast 3 characters long"]
    }

},{timestamps: true})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
        expiresIn: '24h'
      })
    return token
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
    
}

const userModel = mongoose.model("user", userSchema)
module.exports = userModel