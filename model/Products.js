const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  brand_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: "Please Enter product Price",
    maxLength: 8,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      }
    },
  ],
  color: {
    name : {
      type: String,
      required: true,
    },
    hex : {
      type : String,
      required: true,
    }
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    required: true,
    default : "Clothes"
  },
  product_type : {
    type : String,
    required : true,
  },
  for_which_customer : {
    type : String,
    required : true,
  },
  product_size : [
    {
        type : String,
    }
  ],
  stock: {
    type: Number,
    required: true,
    maxLength: 100, 
    default: 1,
  },
  sale : {
    offPercent : {
        type : Number,
        required : true,
        default : 0
    },
    productPrice : {
        type : Number,
        required : true
    },
    offPrice : {
        type : Number,
        required : true,
        default : 0
    }
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user_name:{ 
          type: String,
          required : true,
          maxLength : 50
      },
      r_title: {
        type: String,
        required: true,
        maxLength : 40
      },
      rating: {
        type: Number,
        required: true,
        maxLength : 5
      },
      comment: {
        type: String,
        required: true,
        maxLength : 400
      },
    },
  ],
  tags : Array,
  totalsell : {
    type : Number,
    default : 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", productSchema);