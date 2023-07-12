const Razorpay = require('razorpay')
const crypto = require("crypto");
const errsendres = require('../utils/errsendres');
const Orders = require('../model/Orders');
const User = require('../model/User');

const order_checkout =  async (req,res) => {
    try {
        var instance = new Razorpay({ key_id: process.env.RAZOR_KEY , key_secret: process.env.RAZOR_SECRECT }) 

        var options = {
            amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
            currency: "INR"
        };
        
        const order = await instance.orders.create(options);

        res.status(200).json({
            success : true,
            data: order
        })
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const razor_key =  async (req,res) => {
    
        res.status(200).json({
            success : true,
            data: process.env.RAZOR_KEY
        })
}

const razor_payment_verification = async (req,res) => {
    try {
        const User_Data = req.user_data
        
        if(req.body.response){
                const {razorpay_signature,razorpay_order_id,razorpay_payment_id} = req.body.response
                let body = razorpay_order_id + "|" + razorpay_payment_id;
                var expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_SECRECT)
                                            .update(body.toString())
                                            .digest('hex');
            
                const isAuthenticated = expectedSignature === razorpay_signature
                if(isAuthenticated){
                // add order_in user database
                const order = await Orders.create({
                    user_id : User_Data._id ,
                    products : req.body.order_summary.products,
                    payment_informations : {
                        payment_done : true,
                        payment_razor_refrence_id : razorpay_order_id,
                        payment_method : 'Online'
                    },
                    order_summary : {
                        sub_total : req.body.order_summary.subtotal,
                        gst : req.body.order_summary.gst,
                        delivery_charges : req.body.order_summary.deliverycharge,
                        grand_total : req.body.order_summary.grandtotal
                    },
                    user_informations : {
                        name : `${req.body.user_address.name.firstname} ${req.body.user_address.name.lastname},`,
                        address : `${req.body.user_address.address}, ${req.body.user_address.city}, ${req.body.user_address.state}`,
                        phone : {
                            number : req.body.user_address.phone.number
                        },
                    }
                })
                await User.findByIdAndUpdate(User_Data._id,{$push : {order : {order_id : order._id }}})
                res.status(200).json({
                    success : true,
                    data : order
                })
                }else{
                    res.status(400).json({
                        success : false,
                        error : 'Internal Server Error : Payment not verified!'
                    })
                }
            
        }else{
            // add order_in user database
            const order = await Orders.create({
                user_id : User_Data._id ,
                products : req.body.order_summary.products,
                payment_informations : {
                    payment_done : false,
                    payment_razor_refrence_id : null,
                    payment_method : 'Cash-On-Delivery'
                },
                order_summary : {
                    sub_total : req.body.order_summary.subtotal,
                    gst : req.body.order_summary.gst,
                    delivery_charges : req.body.order_summary.deliverycharge,
                    grand_total : req.body.order_summary.grandtotal
                },
                user_informations : {
                    name : `${req.body.user_address.name.firstname} ${req.body.user_address.name.lastname},`,
                    address : `${req.body.user_address.address}, ${req.body.user_address.city}, ${req.body.user_address.state}`,
                    phone : {
                        number : req.body.user_address.phone.number
                    },
                }
            })

            await User.findByIdAndUpdate(User_Data._id,{order : [{order_id: order._id},...User_Data.order]})
            res.status(200).json({
                success : true,
                data : order
            })
        }
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_order_by_id = async (req,res) => {
    try {
        const order_id = req.params.order_id

        const order = await Orders.findById(order_id)

        return res.status(200).json({
            success : true,
            data : order
        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const cancel_order = async (req,res) => {
    try {
        const order_id = req.params.order_id

        const order = await Orders.findById(order_id)

        if(order.delivery_status !== 'deliverd' || order.delivery_status !== 'cancelled') {
            await Orders.findByIdAndUpdate(order_id, {delivery_status : 'cancelled'})
        }

        return res.status(200).json({
            success : true,
            message : 'Your order has been cancelled, Successfully!'
        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

module.exports = {order_checkout,razor_key,razor_payment_verification,get_order_by_id,cancel_order}