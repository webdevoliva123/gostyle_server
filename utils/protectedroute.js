const errsendres = require('./errsendres');
const { verify_token } = require('./token-bcrypt');
const User = require('../model/User');
const Brand = require('../model/Brand');
const Blogger = require('../model/Blogger');

const protected_route_customer = async (req,res,nxt) => {
    try {

        let user_token = req.headers.authorization

        // return
        if(!user_token){
            return errsendres(res,404,`Unothorized request.`);
        }

        user_token = user_token.split(' ')[1]

        const vtoken = await verify_token(user_token)

        if(!vtoken){
            return errsendres(res,404,`Unothorized request.`);
        }

        const user = await User.findById(vtoken.userId);

        if(!user){
            return errsendres(res,404,`Unothorized request.`);
        }

        req.user_data = user;
    
        return nxt()
        

    } catch (error) {
        return errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const protected_route_brand = async (req,res,nxt) => {
    try {
        const {brand_token} = req.cookies;
        
        if(!brand_token){
            return errsendres(res,404,`Unothorized request.`);
        }
        
        const vtoken = await verify_token(brand_token)
        
        if(!vtoken){
            return errsendres(res,404,`Unothorized request.`);
        }
        
        const brand = await Brand.findById(vtoken.brandId);

        if(!brand){
            return errsendres(res,404,`Unothorized request.`);
        }

        return nxt()
        

    } catch (error) {
        return errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const protected_route_blogger = async (req,res,nxt) => {
    try {
        let blogger_token = req.headers.authorization

        
        // return
        if(!blogger_token){
            return errsendres(res,404,`Unothorized request.`);
        }

        blogger_token = blogger_token.split(' ')[1]
        
        const vtoken = await verify_token(blogger_token)
        
        if(!vtoken){
            return errsendres(res,404,`Unothorized request.`);
        }
        
        const blogger = await Blogger.findById(vtoken.bloggerId);

        req.blogger_data = blogger;
        
        return nxt()

    } catch (error) {
        return errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const protected_route_admin = async (req,res,nxt) => {
    try {
        const {admin_token} = req.cookies;

        if(!admin_token){
            return errsendres(res,404,`Unothorized request.`);
        }
        
        const vtoken = await verify_token(admin_token)
        
        if(!vtoken){
            return errsendres(res,404,`Unothorized request.`);
        }
        

        if(vtoken.admin_email !== process.env.ADMIN_EMAIL){
            return errsendres(res,404,`Unothorized request.`);
        }

        return nxt()
        

    } catch (error) {
        return errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

module.exports = {protected_route_customer,protected_route_brand,protected_route_blogger,protected_route_admin}