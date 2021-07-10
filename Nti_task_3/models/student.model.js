const mongoose = require('mongoose');
const validator = require('validator');
const Student = mongoose.model('Students', {
    name:{
        type:String,
        trim:true,
        required:[true, 'must have a name']
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required:true,
        minLength:10,
        maxLength:50,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ('invalid email')
        }      
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    courses: [
        {
            title: {
                type: String,
                trim: true,
                required: [true, 'must have a title']
            },
            content: {
                type: String,
                trim: true
            }
        }
    ]
    // ,
    // c:[
    //     {
    //         name:{},
    //         age:{}
    //     }
    // ]
})
module.exports = Student;