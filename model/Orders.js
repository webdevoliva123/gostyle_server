const mongoose = require('mongoose');

const order_schema = new mongoose.Schema(
    {
        user_id : {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        products : {
            type : Array,
            required : true,
        },
        payment_informations : {
            payment_done : {
                type : Boolean,
                default : false,
                required : true
            },
            payment_razor_refrence_id : {
                type : String,
                trim : true,
            },
            payment_method : {
                type : String
            }
        },
        order_summary : {
            sub_total : {
                type : Number,
                required : true
            },
            gst : {
                type : Number,
                required : true
            },
            delivery_charges :{
                type : Number,
                required : true
            },
            grand_total : {
                type : Number,
                required : true
            }
        },
        user_informations : {
            name : {
                type : String,
                required : true
            },
            address : {
                type : String,
                required : true
            },
            phone : {
                code : {
                    type : String,
                    required : true,
                    default : "+91"
                },
                number : {
                    type : Number,
                    required : true
                }
            },
        },
        delivery_status : {
            type : String,
            default : "shipped",
            required : true
        },
        order_date : {
            type : Date,
            required : true,
            default : Date.now()
        }
    },
{
    timestamps : true,
})

module.exports = mongoose.model('Orders',order_schema)