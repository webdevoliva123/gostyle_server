const mongoose = require('mongoose');

const blogger_schema = new mongoose.Schema({
    profile : {
        type : String,
        required : true, 
        default : "https://res.cloudinary.com/dfbzb0ao6/image/upload/v1673015057/web/user_tcugyp.png"
    },
    firstname: {
        type : 'string',
        required : true,
        trim : true
    },
    lastname: {
        type :'string',
        required : true,
        trim : true,
    },
    email: {
        type :'string',
        required : true,
        trim : true, 
    },
    password: {
        type : 'string',
        required : true,
        trim : true,
    },
    magazine: [
        {
            magazine_id : {
                type: mongoose.Schema.ObjectId,
                ref: "Magazine",
                required: true,
            }
        }
    ],
    role : {
        type :'string',
        trim : true,
        default : 'blogger'
    }
})

module.exports = mongoose.model('Bloggers',blogger_schema)