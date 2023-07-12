const mongoose = require('mongoose');


const user_schema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        trim : true
    },
    lastname : {
        type : String,
        required : true,
        trim : true
    },
    gender : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        default : 'user'
    },
    location : [
        {
            name : {
                firstname : { 
                    type : String,  
                    required : true,
                    maxlength : 25
                },
                lastname : { 
                    type : String,  
                    required : true,
                    maxlength : 25
                }
            },
            state : {
                type : String,
                trim : true,
                required : true,
            },
            city : {
                type : String,
                trim : true,
                required : true,
            },
            address : {
                type : String,
            },
            phone : {
                code : {
                    type : String,
                    default : '+91'
                },
                number : {
                    type : Number,
                    required : true,
                }
            },
        }
    ],
    wishlist : {
        type : Array,
    },
    order : [
        {
            order_id : {
                type: mongoose.Schema.ObjectId,
                ref: "Orders",
                required: true,
            }
        }
    ],
    following_blogger : [
        {
            blogger_id : mongoose.Schema.ObjectId,
            blogger_name : String,
        }
    ],
    points: {
        type : Number,
        default : 0
    }

},
{timestamps : true})


module.exports = mongoose.model('User',user_schema);