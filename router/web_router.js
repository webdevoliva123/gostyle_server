const express = require('express');
const { get_all_category_product_type_options, get_all_category, get_all_category_wear_type_produts, get_all_category_trending_products, get_product_by_id, you_may_also_like_this, get_products_by_one_product_type, get_products_by_two_product_type, get_products_by_category, get_all_prdoucts, web_verify_token, search_product, get_all_magazine, get_magazine } = require('../controller/web_controller');
const router = express.Router()

router.get('/all/category',get_all_category)
router.get('/all/category/product/type',get_all_category_product_type_options)
router.get('/all/category/product',get_all_category_wear_type_produts)
router.get('/all/trending/products',get_all_category_trending_products)
router.get('/product/:id',get_product_by_id)
router.get('/related/products/:category/:sub_category',you_may_also_like_this)
router.get('/products/:category/:sub_category/:product_type',get_products_by_one_product_type)
router.get('/products/:category/:sub_category/:product_type_1/:product_type_2',get_products_by_two_product_type)
router.get('/products/:category',get_products_by_category)
router.get('/products',get_all_prdoucts)
router.post('/token/verify/:token',web_verify_token)
router.get('/search/products/:query',search_product)
router.get('/all/magazine',get_all_magazine)
router.get('/magazine/:magazine_id',get_magazine)


module.exports = router