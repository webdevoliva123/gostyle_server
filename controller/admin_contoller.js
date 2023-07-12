const errsendres = require('../utils/errsendres');
const { genrate_token } = require('../utils/token-bcrypt');
const User = require('../model/User');
const Brand = require('../model/Brand');
const Blogger = require('../model/Blogger');

const login_as_admin = async (req, res) => {
    try {
        const {email,password} = req.body

        if (!email ||!password) {
            return errsendres(res,400,'Email and password are required');
        }

        if(email !== process.env.ADMIN_EMAIL){
            return errsendres(res,400,'Invalid email or password');
        }
        
        if(password !== process.env.ADMIN_PASSWORD){
            return errsendres(res,400,'Invalid email or password');
        }

        const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };

        const token = await genrate_token({admin_email : process.env.ADMIN_EMAIL},'24h');

        return res.status(200).cookie('admin_token',token,options).json({
            success : true,
            message: 'Admin logged in successfully',
            data : {
                email : process.env.ADMIN_EMAIL,
                role : 'admin',
            }
        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const logout_as_admin = async (req, res) => {
    try {
        res.cookie('admin_token',null,{
            expires: new Date(Date.now()),
            httpOnly: true,
          }).json({
            success : true,
            message: 'Admin logged out successfully',
          })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_all_users = async (req, res) => {
    try {
        let { page } = req.query;

        const resultperpage = 10
        
        if(!page){
            page = 0
        }

        const user = await User.find().skip(page*resultperpage).limit(resultperpage);

        const sendUser = user.map((user) => {
            return {
                _id : user._id.toString(),
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                createdAt : user.createdAt
            }
        })

        return res.status(200).json({
            success : true,
            message : "List Of All Users",
            data : {
                users : sendUser,
                total : (await User.find()).length,
            }
        })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_user = async (req, res) => {
    try {
        let id = req.params.id;

        const user = await User.findById(id) ;

        if(!user){
            return errsendres(res,404,'Customer not found');
        }

        return res.status(200).json({
            success : true,
            message : "All User found",
            data : {
                id:user._id,
                firstname : user.firstname,
                lastname : user.lastname,
                email : user.email,
                phone : user.phone,
                role : user.role,
            }
        })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const delete_user = async (req,res) => {
    try {
        let id = req.params.id;

        const user = await User.findById(id) ;

        if(!user){
            return errsendres(res,404,'User not found');
        }

        await user.remove();

        return res.status(200).json({
            success : true,
            message : "User deleted successfully",
        })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_all_brands = async (req,res) => {
    try{

        let { page } = req.query;

        const resultperpage = 10
        
        if(!page){
            page = 0
        }

        const brand = await Brand.find().skip(page*resultperpage).limit(resultperpage);

        const sendBrand = brand.map((brand) => {
            return {
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

        return res.status(200).json({
            success : true,
            message : "List of All brand",
            data : {
                users : sendBrand,
                total : (await Brand.find()).length,
            }
        })

    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_brand = async (req, res) => {
    try {
        let id = req.params.id;

        const brand = await Brand.findById(id) ;

        if(!brand){
            return errsendres(res,404,'Brand not found');
        }

        return res.status(200).json({
            success : true,
            message : "Brand found.",
            data : {
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
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const all_verified_brand = async (req, res) => {
    try {

        let { page } = req.query;

        const resultperpage = 10
        
        if(!page){
            page = 0
        }

        const brand = await Brand.find({verified:true}).skip(page*resultperpage).limit(resultperpage);

        const sendBrand = brand.map((brand) => {
            return {
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

        return res.status(200).json({
            success : true,
            message : "List of brand which are verified.",
            data : {
                users : sendBrand,
                total : (await Brand.find({verified : true})).length,
            }
        })

        
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const all_nverified_brand = async (req, res) => {
    try {

        let { page } = req.query;

        const resultperpage = 10
        
        if(!page){
            page = 0
        }

        const brand = await Brand.find({verified:false}).skip(page*resultperpage).limit(resultperpage);

        const sendBrand = brand.map((brand) => {
            return {
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

        return res.status(200).json({
            success : true,
            message : "List of brand which are verified.",
            data : {
                users : sendBrand,
                total : (await Brand.find({verified : false})).length,
            }
        })

        
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const make_verify_brand = async (req,res) => {
    try {
        let id = req.params.id;

        const brand = await Brand.findById(id) ;

        if(!brand){
            return errsendres(res,404,'Brand not found');
        }

        if(brand.verified){
            return errsendres(res,404,'Brand is already verified');
        }


        const verifiedBrand = await brand.updateOne({verified : true})

        if(verifiedBrand){

            const addNotifications = {
                title : "Congratulations, Your brand got verified",
                description : `Congratulations! Your brand ${brand.brand_name} has been verified by the official Oliva Trend's system. This verification confirms that your brand is authentic and you are the official representative of your brand. This will give you access to sell your on products. It will also give you a higher level of trust from your customer, as well as a more authoritative presence on the platform. Congratulations on having your brand verified!`,
            }


            await brand.updateOne({notifications : [{title : addNotifications.title,description : addNotifications.description,date : new Date()},...brand.notifications]})

            return res.status(200).json({
                success : true,
                message : "Brand verified",
            })
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const make_brand_banned = async (req,res) => {
    try {
        let id = req.params.id;

        const brand = await Brand.findById(id) ;

        if(!brand){
            return errsendres(res,404,'Brand not found');
        }

        if(!brand.banned){
            const bannedBrand = await brand.updateOne({verified : false, banned : true})

            if(bannedBrand){

                const addNotifications = {
                    title : "Your account has been banned for temporarily for violation of our terms",
                    description : `I apologize for any inconvenience this may have caused. We take our terms and conditions seriously and appreciate your understanding. As a result of the violation, your account has been suspended for a period of time. During this time, you will not be able to access any of our services. Once the suspension period has ended, you will be able to use our services again. 

                    We understand that this may be frustrating and we apologize for any inconvenience this may have caused. We urge you to review our policies and terms of use to ensure that you understand our rules and regulations. 
                    
                    If you have any questions or concerns, please feel free to contact us. Thank you for your understanding.`,
                }

                await brand.updateOne({notifications : [{title : addNotifications.title,description : addNotifications.description,date : new Date()},...brand.notifications]})

                return res.status(200).json({
                    success : true,
                    message : "Brand has been banned"
                })
            }
        }else{
            return errsendres(res,500,`Brand is already banned`);
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const make_brand_unbanned = async (req,res) => {
    try {
        let id = req.params.id;

        const brand = await Brand.findById(id) ;

        if(!brand){
            return errsendres(res,404,'Brand not found');
        }

        if(brand.banned){
            const unbannedBrand = await brand.updateOne({verified : true, banned : false})

            if(unbannedBrand){

                const addNotifications = {
                    title : "Cogratulation, your brand has been unbanned",
                    description : `We are pleased to inform you that your brand has been successfully unbanned. You are now free to continue to use our services as normal. We thank you for your patience and understanding during this process.

                    If you have any questions or concerns, please do not hesitate to contact us. We hope you enjoy using our services.
                    
                    Thank you again for your patience.
                    
                    Sincerely,
                    
                    The Oliva Trend's Team`,
                }

                await brand.updateOne({notifications : [{title : addNotifications.title,description : addNotifications.description,date : new Date()},...brand.notifications]})

                return res.status(200).json({
                    success : true,
                    message : "Brand has been unbanned"
                })
            }
        }else{
            return errsendres(res,500,`Brand is already unbanned`);
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const all_banned_brands = async (req, res) => {
    try {

        let { page } = req.query;

        const resultperpage = 10
        
        if(!page){
            page = 0
        }

        const brand = await Brand.find({banned : true}).skip(page*resultperpage).limit(resultperpage);

        const sendBrand = brand.map((brand) => {
            return {
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

        return res.status(200).json({
            success : true,
            message : "List of brand which are verified.",
            data : {
                users : sendBrand,
                total : (await Brand.find({banned:true})).length,
            }
        })

        
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const brand_rejected = async (req,res) => {
    try {
        let id = req.params.id;

        const brand = await Brand.findById(id) ;

        if(!brand){
            return errsendres(res,404,'Brand not found');
        }

        if(!brand.verified){
            const rejectedBrand = await brand.updateOne({rejected : true})

            if(rejectedBrand){

                const addNotifications = {
                    title : "Sorry, Your account has been rejected.",
                    description : `We apologize for the inconvenience. Your account was rejected you cannot sell your products in this platform. We take these matters very seriously and strive to provide a safe and secure environment for our members. We understand that this can be disappointing and hope you will consider reapplying in the future. \n 
                    Oliva Trend's Team`,
                }

                await brand.updateOne({notifications : [{title : addNotifications.title,description : addNotifications.description,date : new Date()},...brand.notifications]})

                return res.status(200).json({
                    success : true,
                    message : "Brand has been rejected",
                    notification : addNotifications
                })
            }
        }else{
            return errsendres(res,404,'Brand is already verified.');
        }
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const all_bloggers = async (req, res) => {
    try {
        let { page } = req.query;

        const resultperpage = 10
        
        if(!page){
            page = 0
        }

        const bloggers = await Blogger.find().skip(page*resultperpage).limit(resultperpage);

        const sendBlogger = bloggers.map((blogger) => {
            return {
                id:blogger._id,
                firstname : blogger.firstname,
                lastname : blogger.lastname,
                email : blogger.email,
                role : blogger.role,
                followers : blogger.followers,
                blogs : blogger.blogs,
                profile : blogger.profile
            }
        })

        return res.status(200).json({
            success : true,
            message : "List of all bloggers",
            data : {
                users : sendBlogger,
                total : (await Blogger.find()).length,
            }
        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const get_blogger = async (req, res) => {
    try {
        let id = req.params.id;

        const blogger = await Blogger.findById(id) ;

        if(!blogger){
            return errsendres(res,404,'Blogger not found');
        }

        return res.status(200).json({
            success : true,
            message : "blogger has been found",
            data : {
                id:blogger._id,
                firstname : blogger.firstname,
                lastname : blogger.lastname,
                email : blogger.email,
                role : blogger.role,
                followers : blogger.followers,
                blogs : blogger.blogs,
                profile : blogger.profile
            }
        })
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const delete_blogger = async (req, res) => {
    try {
        let id = req.params.id;

        const blogger = await Blogger.findById(id) ;

        if(!blogger){
            return errsendres(res,404,'Blogger not found');
        }

        const dblogger = await blogger.remove()

        if(dblogger){
            return res.status(200).json({
                success : true,
                message : "Blogger deleted successfully",
                data : {
                    id:user._id,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    email : user.email,
                    phone : user.phone,
                    role : user.role,
                }
            })
        }
    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

module.exports = {
    login_as_admin,
    logout_as_admin,
    get_all_users,
    get_user,
    delete_user,
    get_all_brands,
    get_brand,
    all_verified_brand,
    all_nverified_brand,
    make_verify_brand,
    make_brand_banned,
    make_brand_unbanned,
    brand_rejected,
    all_banned_brands,
    all_bloggers,
    get_blogger,
    delete_blogger
}