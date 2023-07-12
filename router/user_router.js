const express = require('express');
const { register_as_customer, login_user, load_user_detail, sendforgetlink, resetpassword, updateuserdetails, changepassword, addlocation, delete_account, logout_customer, add_review, add_product_in_wishlist, remove_product_in_wishlist, add_address, update_address, delete_address } = require('../controller/user_contoller');
const { protected_route_customer } = require('../utils/protectedroute');
const router = express.Router()


router.post('/register/customer',register_as_customer)
router.post('/login/customer',login_user)
router.get('/logout/customer',logout_customer)
router.get('/load/details/customer/:token',load_user_detail)
router.post('/forget/password/link/customer/:email',sendforgetlink)
router.put('/reset/password/customer/:token',resetpassword)
router.put('/update/details/customer',protected_route_customer,updateuserdetails)
router.put('/update/password/customer',protected_route_customer,changepassword)
router.post('/add/location/customer',protected_route_customer,addlocation)
router.delete('/delete/account/customer',protected_route_customer,delete_account)
router.post('/product/review/add/:product_id',protected_route_customer,add_review)
router.put('/add/product/wishlist',protected_route_customer,add_product_in_wishlist)
router.put('/remove/product/wishlist',protected_route_customer,remove_product_in_wishlist)
router.put('/add/location',protected_route_customer,add_address)
router.put('/update/location/:addressId',protected_route_customer,update_address)
router.delete('/delete/location/:addressId',protected_route_customer,delete_address)



module.exports = router