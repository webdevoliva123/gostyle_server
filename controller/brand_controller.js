const Brand = require('../model/Brand')
const validate_email = require('validate-email');
const validatepassword = require('../utils/validatepassword');
const errsendres = require('../utils/errsendres');
const { encrypt_password, genrate_token, decrypt_password, verify_token } = require('../utils/token-bcrypt');
const Products = require('../model/Products');
const { product_category_options, for_which_coustomer_options } = require('../utils/prdoucts_options');

const create_brand_account = async (req,res) => {
    try {
        const {brand_name,work_email,password} = req.body

        if(!brand_name){
            return errsendres(res, 400, "Brand Name is required")
        }else if(brand_name.lenght > 25){
            return errsendres(res, 400, "Brand Name can't be more than 25 characters")
        }

        const vemail = validate_email(work_email)

        if(!work_email){
            return errsendres(res, 400, "Work Email is required")
        }else if(!vemail){
            return errsendres(res, 400, "Work Email is not valid")
        }

        const vpassword = validatepassword(password)

        if(!password){
            return errsendres(res,500,'Please, Enter your password')
        }else if(!vpassword.isValid){
            return errsendres(res,500,vpassword.validationMessage);
        }

        const findbrand = await Brand.findOne({work_email})

        if(findbrand){
            return errsendres(res, 400, "Brand already exists")
        }

        const brand = await Brand.create({
            brand_name,
            work_email,
            password : await encrypt_password(password)
        })

        const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };

        const token = await genrate_token({brandId : brand._id.toString()},'24h');

        if(brand){
            return res.status(201).cookie('brand_token',token,options).json({
                message: 'Brand created successfully',
                data: {
                    id : brand._id,
                    brand_name: brand.brand_name,
                    work_email : brand.work_email,
                    brand_profile : brand.brand_profile,
                    brand_products : brand.brand_products,
                    verified : brand.verified,
                    banned : brand.banned,
                    brand_orders : brand.brand_orders,
                    total_earn : brand.total_earn,
                    role : brand.role,
                }
            })
        }else{
            return errsendres(res, 500, "Internal Server Error. Please, try again later.")
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const login_brand = async (req,res) => {
    try {
        const {work_email, password} = req.body

        if(!work_email ||!password){
            return errsendres(res, 400, "Please, Enter your email and password")
        }

        const vemail = validate_email(work_email);

        if(!vemail){
            return errsendres(res, 400, "Work Email is not valid")
        }

        const vpassword = validatepassword(password)

        if(!vpassword.isValid){
            return errsendres(res,500,vpassword.validationMessage);
        }

        const brand = await Brand.findOne({work_email})

        if(!brand){
            return errsendres(res, 500, "Invalid work email or password.")
        }

        const cpassword = await decrypt_password(password,brand.password)

        if(!cpassword){
            return errsendres(res, 500, "Invalid work email or password.")
        }

        const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };

        const token = await genrate_token({brandId : brand._id.toString()},'24h');

        if(brand){
            return res.status(200).cookie('brand_token',token,options).json({
                message: 'Brand created successfully',
                data: {
                    id : brand._id,
                    brand_name: brand.brand_name,
                    work_email : brand.work_email,
                    brand_profile : brand.brand_profile,
                    brand_products : brand.brand_products,
                    verified : brand.verified,
                    banned : brand.banned,
                    brand_orders : brand.brand_orders,
                    total_earn : brand.total_earn,
                    role : brand.role,
                }
            })
        }else{
            return errsendres(res, 500, "Internal Server Error. Please, try again later.")
        }
        

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const load_brand_details = async (req,res) => {
    try {
        const {brand_token} = req.cookies;

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return  errsendres(res,500,'Unothorized User:')
        }

        const brand = await Brand.findById(brandId);


        if(brand){
            return res.status(200).json({
                message: 'Brand loaded successfully',
                data: {
                    id : brand._id,
                    brand_name: brand.brand_name,
                    work_email : brand.work_email,
                    brand_profile : brand.brand_profile,
                    brand_products : brand.brand_products,
                    verified : brand.verified,
                    banned : brand.banned,
                    role : brand.role,
                }
            })
        }else{
            return errsendres(res, 500, "Internal Server Error. Please, try again later.")
        }
    }
    catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const logout_brand = (req, res) => {
    try{
        res.cookie('brand_token',null,{
            expires: new Date(Date.now()),
            httpOnly: true,
          }).json({
            success : true,
            message: 'User logged out successfully',
          })
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const delete_brand_account = async (req,res) => {
    try{
        const {brand_token} = req.cookies;

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return  errsendres(res,500,'Unothorized User:')
        }

        const brand = await Brand.findById(brandId);

        if(!brand){
            return  errsendres(res,500,'Unothorized User:')
        }

        const removed_brand = await brand.remove()

        if(removed_brand){
            return res.status(200).cookie('brand_token',null,{
                expires: new Date(Date.now()),
                httpOnly: true,
              }).json({
                success : true,
                message: 'User deleted successfully'
            })
        }else{
            return errsendres(res, 500, "Internal Server Error. Please, try again later.")
        }
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const complete_profile_brand = async (req,res) => {
    try{
        const brand_profile = req.body

        if(!brand_profile.contact_no){
            return  errsendres(res,500,'Please, Enter brand contact number.')
        }

        if(!brand_profile.work_location){
            return errsendres(res,500,'Please, Enter brand work location information.')
        }else if(!brand_profile.work_location.country){
            return errsendres(res,500,'Please, Enter country name')
        }else if(!brand_profile.work_location.address){
            return errsendres(res,500,'Please, Enter address name.')
        }
        
        if(!brand_profile.brand_logo){
            return errsendres(res,500,'Please, Upload brand logo')
        }
        
        if(!brand_profile.brand_owner){
            return errsendres(res,500,'Please, Enter brand owner information')
        }
        else if(!brand_profile.brand_owner.name){
            return errsendres(res,500,'Please, Enter brand owner name.')
        }
        else if(!brand_profile.brand_owner.profile){
            return errsendres(res,500,'Please, Enter brand owner profile photo')
        }
        
        const {brand_token} = req.cookies;

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return  errsendres(res,500,'Unothorized User:')
        }

        const brand = await Brand.findById(brandId);

        if(!brand.profile_complete){
            return errsendres(res,500,'Your profile is already created. You can update your profile when you will be verified')
        }

        const updatebrand  =  await brand.updateOne({
            brand_profile : {
                contact_no : Number(brand_profile.contact_no),
                work_location : {
                    country : brand_profile.work_location.country,
                    city : brand_profile.work_location.city,
                    address : brand_profile.work_location.address,
                },
                brand_logo : brand_profile.brand_logo,
                brand_owner : {
                    name : brand_profile.brand_owner.name,
                    profile : brand_profile.brand_owner.profile,
                },
                profile_complete : true
              }
        })

        if(updatebrand){
            return res.status(200).json({
                success : true,
                message: `Profile created for your brand successfully. Please, wait for 2 - 3 day's. You will be verified for selling your brand product in Oliva Trend's`,
                data : brand.brand_profile
            })
        }else{
            return errsendres(res, 500, "Internal Server Error. Please, try again later.")
        }

    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const update_brand_profile = async (req,res) => {
    try {
        const {brand_token} = req.cookies;
        const up_profile_data = req.body.up_profile 

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return  errsendres(res,500,'Unothorized User:')
        }

        const brand = await Brand.findById(brandId);

        if(brand.verified){
            const profile = await brand.updateOne({
                work_location : {...brand.work_location,up_profile_data}
            })

            if(profile){
                return res.status(200).json({
                    success : true,
                    message: `Brand profile has been updated.`
                })
            }else{
                return errsendres(res, 500, "Internal Server Error. Please, try again later.")
            }
        }else{
            return errsendres(res, 500, "Internal Server Error. You can not update your until brand in not verified.")
        }
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const send_forget_link_brand = async (req, res) => {
    try {
        const work_email = req.params.work_email

        const vemail = validate_email(work_email)

        if(!vemail){
            return errsendres(res, 400, "Work Email is not valid")
        }        

        const findbrand = await Brand.findOne({work_email});

        if(!findbrand){
            return  errsendres(res,500,'This work email does not exist.')
        }

        const genrate_link = `http://${process.env.DASHBOAD_BASE_URI}/forget/password/link/${await genrate_token({brandId : findbrand._id.toString()},'15m')}`

        // sendmail(genrate_link)

        return res.status(200).json({
            success : true,
            message: `Email has been sent to your work email address.`,
            data : genrate_link

        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const reset_password_brand = async (req, res) => {
    try {
        const pass_reset_token = req.params.token
        const {newpassword} = req.body

        const vtoken = await verify_token(pass_reset_token);

        if(!vtoken){
            return  errsendres(res,500,`Invalid token or token has expired`);   
        }

        const findbrand = await Brand.findById(vtoken.brandId);

        if(findbrand){
            const updatedbrand = await findbrand.updateOne({password : await encrypt_password(newpassword)})

            if(updatedbrand){
                return res.status(200).json({
                    success : true,
                    message: `Password has been reset successfully.`
                })
            }

        }
        
    } catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const brand_change_password = async (req,res) => {
    try {
        const {brand_token} = req.cookies;
        const {oldpassword,newpassword} = req.body

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return  errsendres(res,500,'Unothorized User:')
        }

        const brand = await Brand.findById(brandId);

        if(brand){
            const cpassword = await decrypt_password(oldpassword,brand.password)

            if(!cpassword){
                return  errsendres(res,500,'You have enter wrong old password.')
            }

            const updatedbrand = await brand.updateOne({password : await encrypt_password(newpassword)})

            if(updatedbrand){
                return res.status(200).json({
                    success : true,
                    message: `Password has been changed successfully.`
                })
            }
        }
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const create_prdouct = async (req, res) => {
    try {
        const {brand_token} = req.cookies;

        const vtoken = await verify_token(brand_token);

        if(!vtoken){
            return  errsendres(res,500,`Invalid token or token has expired`);   
        }

        const findbrand = await Brand.findById(vtoken.brandId);

        if(!findbrand){
            return  errsendres(res,500,`Something went wrong : Internal Server Error`);  
        }

    
        const {p_name,p_description,p_price,p_images,p_category,p_sub_category,p_size,p_type,for_which_customer,sale,color,p_stock,p_tags} = req.body

        if(!p_name){
            return errsendres(res,500,`Please enter product name`); 
        }

        if(!p_description){
            return errsendres(res,500,`Please enter product description`); 
        }
        
        if(!p_price){
            return errsendres(res,500,`Please enter product price`); 
        }else if(p_price < 3  || p_price.length > 8){
            return errsendres(res,500,`Product price should be between 3 and 8 number long.`); 
        }

        if(!p_images){
            return errsendres(res,500,`Please add product image`); 
        }else if(p_images.length === 0){
            return errsendres(res,500,`Product should have alteast 1 image.`); 
        }

        if(!p_category){
            return errsendres(res,500,`Please enter product category`); 
        }

        let valid_p_category = await product_category_options.filter((opt) => {
            if(opt === p_category){
                return true
            }
        })

        if(valid_p_category.length === 0) {
            return errsendres(res,500,`Something went wrong : Invalid product category`); 
        }
        
        if(!for_which_customer){
            return errsendres(res,500,`Please enter customer name.`); 
        }

        let valid_for_which_customer = await for_which_coustomer_options.filter((opt) => {
            if(opt === for_which_customer){
                return true
            }
        })

        if(valid_for_which_customer.length === 0) {
            return errsendres(res,500,`Something went wrong : Invalid product category`); 
        }

        if(!color){
            return errsendres(res,500,`Please enter product color`);
        }

        if(!p_stock){
            return errsendres(res,500,`Please enter product stock`);
        }

        if(!p_type){
            return errsendres(res,500,`Please enter customer name.`); 
        }

        const addproduct = {
            brand_id : vtoken.brandId,
            name : p_name,
            description : p_description,
            price : sale.offPercent !== 0 ? Math.round((p_price/100)*sale.offPercent) : p_price,
            images : p_images,
            color,
            category : p_category,
            sub_category : p_sub_category,
            product_type : p_type,
            for_which_customer,
            stock : p_stock,
            product_size : p_size,
            sale : {
                offPercent : sale.offPercent,
                productPrice : p_price,
                offPrice : Math.round((p_price/100)*sale.offPercent)
            },
            tags : p_tags
        }
        

        const product = await Products.create(addproduct);

        if(product){
            return res.status(201).json({
                success : true,
                message : "Product create successfully",
                data : product
            })
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const update_product_stock =  async (req,res) => {
    try {
        const {brand_token} = req.cookies;

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return errsendres(res,500,'Unothorized User:')
        }

        const product = await Products.findById(req.params.id)

        if(!product){
            return errsendres(res,500,'Internal Error: Product not found')
        }

        if(brandId !== product.brand_id.toString()){
            return errsendres(res,500,'Unothorized User: Internal Error')
        }

        const {stock} = req.body

        if(!stock){
            return errsendres(res,500,'Please enter a stock')
        }

        const updateStock = await product.updateOne({stock})

        if(updateStock){
            return res.status(200).json({
                success : true,
                message : "Product stock has been updated",
            })
        }
        
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const update_product_sale =  async (req,res) => {
    try{
        const {brand_token} = req.cookies;

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return errsendres(res,500,'Unothorized User:')
        }

        const product = await Products.findById(req.params.id)

        if(!product){
            return errsendres(res,500,'Internal Error: Product not found')
        }

        if(brandId !== product.brand_id.toString()){
            return errsendres(res,500,'Unothorized User: Internal Error')
        }

        const {sale} = req.body

        const updateSale = await product.updateOne({price : sale.offPercent !== 0 ? Math.round((product.sale.productPrice/100)*sale.offPercent) : product.sale.productPrice , sale : {
                offPercent : sale.offPercent,
                productPrice : product.sale.productPrice,
                offPrice : Math.round((product.sale.productPrice/100)*sale.offPercent)
        }})

        if(updateSale){
            return res.status(200).json({
                success : true,
                message : "Product sale has been updated",
            })
        }
        
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const update_product_deatils = async (req,res) => {
    try{
        const {brand_token} = req.cookies;

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return errsendres(res,500,'Unothorized User:')
        }

        const product = await Products.findById(req.params.id)

        if(!product){
            return errsendres(res,500,'Internal Error: Product not found')
        }

        if(brandId !== product.brand_id.toString()){
            return errsendres(res,500,'Unothorized User: Internal Error')
        }

        const {p_name,p_description,p_price,p_images,p_category,p_type,for_which_customer,color,p_tags,totalsell} = req.body

        const update_product = {
            name : p_name,
            description : p_description,
            price : p_price,
            images : p_images,
            color,
            category : p_category,
            product_type : p_type,
            for_which_customer,
            sale : {
                offPercent : 0,
                productPrice : p_price,
                offPrice : 0
            },
            tags : p_tags,
            totalsell
        }

        const updateProduct = await product.updateOne(update_product)

        if(updateProduct){
            return res.status(200).json({
                success : true,
                message : "Product details has been updated",
            })
        }
        
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_product_details = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id)

        if (product) {
            return res.status(200).json({
                success : true,
                message : "Product found",
                data : product
            })
        }else{
            return errsendres(res,500,`Product not found`);
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_all_brands_product = async (req, res) => {
    try {
        const {brand_token} = req.cookies;

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return errsendres(res,500,'Unothorized User:')
        }

        const product = await Products.find({brand_id : brandId })

        if (product) {
            return res.status(200).json({
                success : true,
                message : "All brand products",
                data : product.reverse()
            })
        }else{
            return errsendres(res,500,`Product not found`);
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const delete_product =  async (req,res) => {
    try {
        const {brand_token} = req.cookies;

        if(!brand_token){
            return  errsendres(res,500,'Unothorized User: Please be logged in')
        }

        const {brandId} = await verify_token(brand_token);

        if(!brandId){
            return errsendres(res,500,'Unothorized User:')
        }

        const product = await Products.findById(req.params.id)

        if(!product){
            return errsendres(res,500,'Internal Error: Product not found')
        }

        if(brandId !== product.brand_id.toString()){
            return errsendres(res,500,'Unothorized User: Internal Error')
        }


        const deleteProduct = await product.remove()

        if(deleteProduct){
            return res.status(200).json({
                success : true,
                message : "Product deleted successfully",
            })
        }
        
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

module.exports = {create_brand_account,login_brand,load_brand_details,logout_brand,delete_brand_account,complete_profile_brand,update_brand_profile,send_forget_link_brand,reset_password_brand,brand_change_password,create_prdouct,update_product_stock,update_product_sale,update_product_deatils,get_product_details,get_all_brands_product,delete_product}