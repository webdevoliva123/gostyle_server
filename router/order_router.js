const express = require('express');
const { order_checkout, razor_key, razor_payment_verification, get_order_by_id, cancel_order } = require('../controller/order_controller');
const { protected_route_customer } = require('../utils/protectedroute');
const router = express.Router()


router.post('/checkout',protected_route_customer,order_checkout)
router.get('/razor/key',protected_route_customer,razor_key)
router.post('/payment/verification',protected_route_customer,razor_payment_verification)
router.get('/order/:order_id',protected_route_customer,get_order_by_id)
router.put('/cancel/order/:order_id',protected_route_customer,cancel_order)


module.exports = router