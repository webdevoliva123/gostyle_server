const Products = require('../model/Products');
const Brand = require('../model/Brand')
const { product_category_options } = require('../utils/prdoucts_options');
const errsendres = require('../utils/errsendres');
const { size_filter_options, color_filter_options, products_type_filter_options, size_filter_options_2, color_filter_options_2, products_type_filter_options_2, size_filter_options_3 } = require('../utils/all_filter_options');
const { verify_token } = require('../utils/token-bcrypt');
const magazine = require('../model/magazine');


const get_all_category =  async (req,res) => {
    try {
        return res.status(200).json({
            status: "success",
            message : "All Categories",
            data: product_category_options
        })
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_all_category_product_type_options = async (req,res) => {
    try {
        let menu = [
            {
                cat : "Women",
                p_type : []
            },
            {
                cat : "Men",
                p_type : []
            },
            {
                cat : "Baby",
                p_type : []
            },
            {
                cat : "Kids",
                p_type : []
            },
            {
                cat : "Beauty",
                p_type : []
            },
            {
                cat : "Home",
                p_type : []
            }
        ]
        
        const women_prd = await Products.find({category : 'Women'})

        women_prd.map((prd) => {
            const find =  menu[0].p_type.filter(p_type => {
                if(p_type === prd.product_type){
                    return true;
                }
            })

            if(find.length === 0){
                menu[0].p_type.push(prd.product_type)
            }
        })

        const men_prd = await Products.find({category : 'Men'})

        men_prd.map((prd) => {
            const find =  menu[1].p_type.filter(p_type => {
                if(p_type === prd.product_type){
                    return true;
                }
            })

            if(find.length === 0){
                menu[1].p_type.push(prd.product_type)
            }
        })

        const baby_prd = await Products.find({category : 'Baby'})

        baby_prd.map((prd) => {
            const find =  menu[2].p_type.filter(p_type => {
                if(p_type === prd.product_type){
                    return true;
                }
            })

            if(find.length === 0){
                menu[2].p_type.push(prd.product_type)
            }
        })

        const kids_prd = await Products.find({category : 'Kids'})

        kids_prd.map((prd) => {
            const find =  menu[3].p_type.filter(p_type => {
                if(p_type === prd.product_type){
                    return true;
                }
            })

            if(find.length === 0){
                menu[3].p_type.push(prd.product_type)
            }
        })

        const beauty_prd = await Products.find({category : 'Beauty'})

        beauty_prd.map((prd) => {
            const find =  menu[4].p_type.filter(p_type => {
                if(p_type === prd.product_type){
                    return true;
                }
            })

            if(find.length === 0){
                menu[4].p_type.push(prd.product_type)
            }
        })

        const home_prd = await Products.find({category : 'Home'})

        home_prd.map((prd) => {
            const find =  menu[5].p_type.filter(p_type => {
                if(p_type === prd.product_type){
                    return true;
                }
            })

            if(find.length === 0){
                menu[5].p_type.push(prd.product_type)
            }
        })

        return res.status(200).json({
            success:true,
            message : "all option loaded",
            data : menu
        })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_all_category_wear_type_produts = async (req,res) => {
    try {

        let {category,p_type,page} = req.query

        if(!category || !p_type){
            return  errsendres(res,500,`Please enter category and product type.`);
        }

        const resultperpage = 10
        
        if(!page){
            page = 0
        }

        return res.status(200).json({
            status: "success",
            message : "All Categories",
            data: {
                products : await Products.find({category,product_type:p_type}).skip(page*resultperpage).limit(resultperpage),
                total_products : (await Products.find({category,product_type:p_type})).length
            }
        })
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_all_category_products = async (req,res) => {
    try {

        let {category,page} = req.query

        if(!category || !p_type){
            return  errsendres(res,500,`Please enter category and product type.`);
        }

        const resultperpage = 10
        
        if(!page){
            page = 0
        }

        return res.status(200).json({
            status: "success",
            message : "All Categories",
            data: {
                products : await Products.find({category,product_type:p_type}).skip(page*resultperpage).limit(resultperpage),
                total_products : (await Products.find({category,product_type:p_type})).length
            }
        })
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_all_category_trending_products = async (req,res) => {
    try {
        const baby_category = await Products.find({category:'Baby'}).sort({totalsell:-1}).limit(8)
        const men_category = await Products.find({category:'Men'}).sort({totalsell:-1}).limit(8)
        const women_category = await Products.find({category:'Women'}).sort({totalsell:-1}).limit(8)
        const kids_category = await Products.find({category:'Kids'}).sort({totalsell:-1}).limit(8)
        const home_category = await Products.find({category:'Home'}).sort({totalsell:-1}).limit(8)
        const beauty_category = await Products.find({category:'Beauty'}).sort({totalsell:-1}).limit(8)

        return res.status(200).json({
            success : true,
            message : 'All trending Products',
            data : {
                men : men_category,
                women : women_category,
                kids : kids_category,
                baby : baby_category,
                home : home_category,
                beauty : beauty_category
            }
        })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_product_by_id = async (req,res,nxt) => {
    try {
        const _id = req.params.id
        const find_product = await Products.findById(_id)

        if(!find_product){
            return errsendres(res,500,`Internal server error : Product Not Found.`);
        }

        const find_brand = await Brand.findById(find_product.brand_id)

        if(!find_brand){
            return errsendres(res,500,`Internal server error : Product Brand Not Found.`);
        }

        return res.status(200).json({
            success : true,
            message : 'Product Found',
            data : {
                sale : find_product.sale,
                sub_category : find_product.sub_category,
                totalsell : find_product.totalsell,
                _id : find_product._id,
                name : find_product.name,
                description : find_product.description,
                price : find_product.price,
                ratings : find_product.ratings,
                images : find_product.images,
                color : find_product.color,
                category : find_product.category,
                product_type : find_product.product_type,
                for_which_customer : find_product.for_which_customer,
                product_size : find_product.product_size,
                stock : find_product.stock,
                numOfReviews : find_product.numOfReviews,
                tags : find_product.tags,
                reviews : find_product.reviews,
                brand_info : {
                    brand_name: find_brand.brand_name,
                    _id :  find_brand._id
                }
            }
        })
        
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const you_may_also_like_this = async (req,res) => {
    try {
        const {category,sub_category} = req.params
        const products = await Products.find({category,sub_category}).limit(6)

        return res.status(200).json({
            success : true,
            message : 'All Related Products',
            data : {
                products,
                total_products : products.length
            }
        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_products_by_one_product_type = async (req,res) => {
    try {
        const {category,sub_category,product_type} = req.params
        const filter = req.body.filter

        if(!filter){
            const products = await Products.find({category,sub_category,product_type})


            return res.status(200).json({
                success : true,
                message : 'All Products',
                data : {
                    products,
                    total_products : products.length,
                    filter_options : {
                        sizes : await size_filter_options(category,sub_category,product_type),
                        colors : await color_filter_options(products),
                        product_types : await products_type_filter_options(category,sub_category)
                    }
                }
            })
        }else{
            const {ShortBy} = filter
            let products = []
            if(!ShortBy){
                products = await Products.find({category,sub_category,product_type}).find(filter)
            }else{
                switch(ShortBy){
                    case "Trending" :
                        products = await Products.find({category,sub_category,product_type}).sort({totalsell:-1})
                        break;
                    case "New In" :
                        products = await Products.find({category,sub_category,product_type})
                        break;
                    case "Price High To Low" :
                        products = await Products.find({category,sub_category,product_type}).sort({price:-1})
                        break;
                    case "Price Low To High" :
                        products = await Products.find({category,sub_category,product_type}).sort({price:1})
                        break;
                }
            }

            return res.status(200).json({
                success : true,
                message : 'All Products',
                data : {
                    products,
                    total_products : products.length,
                    filter_options : {
                        sizes : await size_filter_options(category,sub_category,product_type),
                        colors : await color_filter_options(products),
                        product_types : await products_type_filter_options(category,sub_category)
                    }
                }
            })
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_products_by_two_product_type = async (req,res) => {
    try {
        const {category,sub_category,product_type_1,product_type_2} = req.params
        const products = await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]}})
        

        return res.status(200).json({
            success : true,
            message : 'All Products',
            data : {
                products,
                total_products : products.length,
                filter_options : {
                    sizes : await size_filter_options_2(category,sub_category,product_type_1,product_type_2),
                    colors : await color_filter_options(products),
                    product_types : await products_type_filter_options(category,sub_category)
                }
            }
        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_products_by_category = async (req,res) => {
    try {
        const {category} = req.params
        const products = await Products.find({category})
        

        return res.status(200).json({
            success : true,
            message : 'All Products',
            data : {
                products,
                total_products : products.length,
                filter_options : {
                    sizes : await size_filter_options_3(category),
                    colors : await color_filter_options(products),
                    product_types : await products_type_filter_options_2(category)
                }
            }
        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_all_prdoucts = async (req,res) => {
    try {
        const {category} = req.params
        const products = await Products.find()
        

        return res.status(200).json({
            success : true,
            message : 'All Products',
            data : {
                products,
                total_products : products.length,
                filter_options : {
                    sizes : await size_filter_options_3(category),
                    colors : await color_filter_options(products),
                    product_types : await products_type_filter_options_2(category)
                }
            }
        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const web_verify_token = async (req, res) => {
    try {
        const {token} = req.params


        const isTokenValid = await verify_token(token)

        if(isTokenValid){
            return res.status(200).json({
                success : true
            })
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const search_product = async (req, res) => {
    try {
        const {query} = req.params || ''

        let products = []

        products = [...products,await Products.find({name : {$regex :query?.toUpperCase()}})]
        products = [...products,await Products.find({name : {$regex :query?.toLowerCase()}})]
        products = [...products,await Products.find({description : {$regex :query?.toUpperCase()}})]
        products = [...products,await Products.find({description : {$regex :query?.toLowerCase()}})]
        products = [...products,await Products.find({product_type : {$regex :query?.toUpperCase()}})]
        products = [...products,await Products.find({product_type : {$regex :query?.toLowerCase()}})]


        products = await products.flat(1)

        const remove_repeated_prdoucts = []
        await products.map(product => {
            let already_have = remove_repeated_prdoucts.map(rproduct => {
                if(rproduct._id === product._id) {
                    return true
                }
            })

            if(already_have.length === 0){
                remove_repeated_prdoucts.push(product)
            }
        })

        res.status(200).json({
            success : true,
            data : {
                products : remove_repeated_prdoucts,
                total_products : products.length,
                filter_options : {
                    sizes : [],
                    colors : [],
                    product_types : []
                }
            }
        })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const get_all_magazine = async (req,res) => {
    try {
        const get_all_mazine = await magazine.find()
        res.status(200).json({
            success : true,
            data : get_all_mazine.reverse()
        })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const get_magazine = async (req,res) => {
    try {
        const {magazine_id} = req.params
        const get_mazine = await magazine.findById(magazine_id)
        res.status(200).json({
            success : true,
            data : get_mazine
        })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

module.exports = {get_all_category,get_all_category_product_type_options,get_all_category_wear_type_produts,get_all_category_trending_products,get_all_category_trending_products,get_product_by_id,you_may_also_like_this,get_products_by_one_product_type,get_products_by_two_product_type,get_products_by_category,get_all_prdoucts,web_verify_token,search_product,get_all_magazine,get_magazine}