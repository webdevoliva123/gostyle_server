const express = require('express');
const { register_as_blogger, login_blogger, logout_blogger, load_blogger_detail, blogger_send_forget_link, blogger_reset_password, update_blogger_details, blogger_change_password, blogger_delete_account, create_magazine } = require('../controller/blogger_controller');
const { protected_route_blogger } = require('../utils/protectedroute');
const router = express.Router()

router.post('/register/blogger',register_as_blogger),
router.post('/login/blogger',login_blogger)
router.get('/logout/blogger',logout_blogger)
router.get('/load/details/blogger',protected_route_blogger,load_blogger_detail)
router.get('/blogger/forget/password/:email',blogger_send_forget_link)
router.put('/blogger/change/password/:token',blogger_reset_password)
router.put('/blogger/update/profile',protected_route_blogger,update_blogger_details)
router.put('/blogger/update/password',protected_route_blogger,blogger_change_password)
router.post('/new/magazine',protected_route_blogger,create_magazine)

module.exports = router