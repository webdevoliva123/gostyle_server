const mongoose = require('mongoose');

const brand_schema = new mongoose.Schema({
  brand_name : {
    type : String,
    required : true,
  },
  work_email  : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  brand_profile : {
    contact_no :  Number,
    work_location : {
        country : String,
        city : String,
        address : String,
    },
    brand_logo : String,
    brand_owner : {
        name : String,
        profile : String,
    },
    profile_complete : {
        type : Boolean,
        default : false
    }
  },
  notifications : [
    {
      title : String,
      description : String,
      date : Date ,
      read : {
        type : Boolean,
        default : false,
      },
    }
  ],
  total_earn: {
    type : Number,
    default : 0
},
  verified : {
    type : Boolean,
    default : false
  },
  rejected : {
    type : Boolean,
    default : false
  },
  banned : {
    type : Boolean,
    default : false
  },
role : {
    type : String,
    default : 'brand'
}
},
{
    timestamps : true,
})

module.exports = mongoose.model('Brand',brand_schema)