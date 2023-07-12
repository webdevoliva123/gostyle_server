const express = require('express');
const { create_brand_account, login_brand, load_brand_details, logout_brand, delete_brand_account, complete_profile_brand, update_brand_profile, send_forget_link_brand, reset_password_brand, brand_change_password, create_prdouct, update_product_stock, update_product_sale, update_product_deatils, get_product_details, get_all_brands_product, delete_product } = require('../controller/brand_controller');
const { protected_route_brand } = require('../utils/protectedroute');
const router = express.Router();


router.post('/brand/new/account',create_brand_account)
router.post('/brand/login',login_brand)
router.get('/brand/load/details',protected_route_brand,load_brand_details)
router.get('/brand/logout',logout_brand)
router.delete('/brand/delete/account',protected_route_brand,delete_brand_account)
router.post('/brand/complete/profile',protected_route_brand,complete_profile_brand)
router.put('/brand/update/profile',protected_route_brand,update_brand_profile)
router.get('/brand/forget/password/:work_email',send_forget_link_brand)
router.put('/brand/change/password/:token',reset_password_brand)
router.put('/brand/update/password',protected_route_brand,brand_change_password)
router.post('/brand/new/product',protected_route_brand,create_prdouct)
router.put('/brand/update/product/stock/:id',protected_route_brand,update_product_stock)
router.put('/brand/update/product/sale/:id',protected_route_brand,update_product_sale)
router.put('/brand/update/product/details/:id',protected_route_brand,update_product_deatils)
router.get('/brand/product/details/:id',protected_route_brand,get_product_details)
router.delete('/brand/delete/product/:id',protected_route_brand,delete_product)
router.get('/brand/all/products',protected_route_brand,get_all_brands_product)

module.exports = router