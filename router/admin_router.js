const express = require('express');
const { login_as_admin, logout_as_admin, get_all_users, get_user, delete_user, get_all_brands, get_brand, all_verified_brand, all_nverified_brand, make_verify_brand, make_brand_banned, make_brand_unbanned, all_banned_brands, all_bloggers, brand_rejected, get_blogger, delete_blogger } = require('../controller/admin_contoller');
const { protected_route_admin } = require('../utils/protectedroute');
const router = express.Router()

router.post('/login/admin',login_as_admin)
router.get('/logout/admin',logout_as_admin)
router.get('/all/users',protected_route_admin,get_all_users)
router.get('/find/user/:id',protected_route_admin,get_user)
router.delete('/delete/user/:id',protected_route_admin,delete_user)
router.get('/all/brands',protected_route_admin,get_all_brands)
router.get('/find/brand/:id',protected_route_admin,get_brand)
router.get('/all/verified/brands',protected_route_admin,all_verified_brand)
router.get('/all/nverified/brands',protected_route_admin,all_nverified_brand)
router.put('/verify/brand/:id',protected_route_admin,make_verify_brand)
router.put('/banned/brand/:id',protected_route_admin,make_brand_banned)
router.put('/unbanned/brand/:id',protected_route_admin,make_brand_unbanned)
router.put('/rejected/brand/:id',protected_route_admin,brand_rejected)
router.get('/all/banned/brands',protected_route_admin,all_banned_brands)
router.get('/all/bloggers',protected_route_admin,all_bloggers)
router.get('/find/blogger/:id',protected_route_admin,get_blogger)
router.delete('/delete/blogger/:id',protected_route_admin,delete_blogger)

module.exports = router