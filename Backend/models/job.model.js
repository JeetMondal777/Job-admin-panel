const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:[3,"Title must be atleast 3 characters long"]
    },
    description:{
        type:String,
        required:true,
        minlength:[10,"Description must be atleast 10 characters long"]
    },
    jobtype:{
        type:String,
        required:true,
        enum:["Full-Time","Part-Time","Contract","Internship"]
    },
    location:{
        type:String,
        required:true,
        minlength:[3,"Location must be atleast 3 characters long"]
    },
    salary:{
        type:String,
        required:true,
        min:[1000,"Salary must be atleast 1000"]
    },
    company:{
        type:String,
        required:true,
        minlength:[3,"Company name must be atleast 3 characters long"]
    },

    applicationDeadline:{
        type:Date,
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{timestamps: true})

const jobModel = mongoose.model("job", jobSchema)
module.exports = jobModel
