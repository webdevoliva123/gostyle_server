const mongoose = require('mongoose');

const order_schema = new mongoose.Schema(
    {
        cover_image : {
            type : String,
            require : true
        },
        title : {
            type : String,
            require : true
        },
        summary: {
            type : String,
            require : true
        },
        upload_date : {
            type : Date,
            require : true
        },
        author : {
            type: mongoose.Schema.ObjectId,
            ref: "Bloggers",
            required: true,
        },
        content : {
            type : String,
            require : true
        }
    },
    {
        timestamps : true,
    })

module.exports = mongoose.model('Magazine',order_schema)