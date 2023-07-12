const User = require('../model/User');
const validate_email = require('validate-email');
const validatepassword = require('../utils/validatepassword');
const errsendres = require('../utils/errsendres');
const { encrypt_password, genrate_token, decrypt_password, verify_token } = require('../utils/token-bcrypt');
const Products = require('../model/Products');
const { sendmail } = require('../utils/sendmail');


const register_as_customer = async (req,res) => {
    try{
        const {firstname,lastname,email,password} = req.body;
        
        const already_user = await User.findOne({email})

        if(already_user){
            return errsendres(res, 400, 'User is already registered')
        }3

        if(!firstname){
            return errsendres(res,500,'Please, Enter your first name')
        }else if(firstname.length < 3 || firstname.length > 20){
            return errsendres(res,500,'First name should be between 3 and 20 characters')
        }

        if(!lastname){
            return errsendres(res,500,'Please, Enter your first name')
        }else if(lastname.length < 3 || lastname.length > 20){
            return errsendres(res,500,'Last name should be between 3 and 20 characters')
        }

        const vemail = validate_email(email)

        if(!email){
            return errsendres(res,500,'Please, Enter your email address.')
        }else if(!vemail){
            return errsendres(res,500,'Please, Enter valid email address')
        }

        const vpassword = validatepassword(password)

        if(!password){
            return errsendres(res,500,'Please, Enter your password')
        }else if(!vpassword.isValid){
            return errsendres(res,500,vpassword.validationMessage);
        }

        const user = await User.create({
            firstname,
            lastname,
            email,
            password : await encrypt_password(password)
        })

        const token = await genrate_token({userId : user._id.toString()},'24h');

        if(user){
            return res.status(201).json({
                success : true,
                message: 'User created successfully',
                data : {
                    id:user._id,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    email : user.email,
                    phone : user.phone,
                    role : user.role,
                    wishlist : user.wishlist,
                    location : user.location,
                    order : user.order,
                    points : user.points
                },
                token
            })
        }else{
            return  errsendres(res,500,`Internal Server Error. User not created.`)
        }
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const login_user = async (req,res) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return errsendres(res,500,'Invalid username or password.')
        }

        const dpassword = await decrypt_password(password,user.password);

        if(!dpassword){
            return errsendres(res,500,'Invalid username or password.')
        }

        
        const token = await genrate_token({userId : user._id.toString()},'24h');

        return res.status(200).json({
            success : true,
            message: 'User logged in successfully',
            data : {
                id:user._id,
                firstname : user.firstname,
                lastname : user.lastname,
                email : user.email,
                phone : user.phone,
                role : user.role,
                wishlist : user.wishlist,
                location : user.location,
                order : user.order,
                points : user.points
            },
            token
        })

    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const logout_customer = async (req,res) => {
    try {
        res.cookie('user_token',null,{
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

const load_user_detail = async (req,res) => {
    try{
        const {token} = req.params;

        const {userId} = await verify_token(token);

        if(!userId){
            return  errsendres(res,500,'Unothorized User:')
        }

        const user = await User.findOne({_id : userId})

        if(user){
            return res.status(200).json({
                success : true,
                message: 'User data loaded successfully',
                data : {
                    id:user._id,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    email : user.email,
                    phone : user.phone,
                    role : user.role,
                    wishlist : user.wishlist,
                    location : user.location,
                    order : user.order,
                    points : user.points
                }
            })
        }
        
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const sendforgetlink = async (req,res) => {
    try {
        const useremail = req.params.email

        const user = await User.findOne({email : useremail})

        if(!user){
            return  errsendres(res,404,'This is email address is not registered. Please register your account.')
        }

        const token = await genrate_token({userId : user._id.toString()},'15m')
        const link = `${process.env.CLIENT_BASE_URI}/forget/password/link/${token}`

        const mailOptions = {
            from : process.env.WEB_EMAIL,
            to : useremail,
            subject : `Replacement login information for ${(user?.firstname).toLowerCase()} at arena online clothing store.`,
            html : `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title> <style> @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap'); *{ margin: 0; padding: 0; box-sizing: border-box; font-family: 'Roboto', sans-serif; } .container{ width: 100%; min-height: 100vh; height: auto; padding: 20px 60px; } .logox{ width: 200px; height: 120px; margin: 0 auto; } .logox > img{ width: 100%; height: 100%; object-fit: cover; } .mail-heading{ margin: 30px 0; font-size: 24px; color: #000; font-weight: bold; } .hr{ width: 100%; height: 0.5px; opacity: 0.5; background: #222; } .hr.active{ margin-bottom: 40px; } .main-container{ width: 100%; /* padding: 0 40px; */ } .description{ font-size: 13px; line-height: 1.31; color: #666; } a{ color: #000000 !important; text-decoration: underline; font-weight: bold; font-size: 13px; line-height: 1.31; } footer{ width: 100%; padding: 40px 20px; background: #000; height: 30vh; } footer > p{ color: #c8c8c8; font-size: 13px; line-height: 1.31; text-align: center; max-width: 55%; margin: 0 auto; }  @media screen and (max-width:750px) { .container{ padding: 20px 20px; } footer > p{ max-width: 90%; } }</style></head><body> <div class="container"> <div> <div class="logox"> <img src="https://res.cloudinary.com/dfbzb0ao6/image/upload/v1674414453/web/logos/New_Project_eceo5s.png" alt=""> </div> <div class="hr"></div> <div class="main-container"> <h1 class="mail-heading">Hello ${user?.firstname},</h1> <div class="hr active"></div> <article class="description">We received a request to reset your password for your Arena account.</article> <br><br> <article class="description">Simply click on the below link to set a new password:</article> <br><br> <a href="${link}">${link}</a> <br><br> <article class="description">If you didn't ask to change your password, please ignore this email.</article> <br> <article class="description">Best Wishes,</article> <br> <article class="description">The Arean Tech Team,</article> <br> <article class="description">To contact us, click <a href="${process.env.CLIENT_BASE_URI}/contact-us" target="_blank">contact us.</a></article> <br> <a href="${process.env.CLIENT_BASE_URI}">Arena Clothing Store.</a> <br><br><br> <footer> <p>© Arena business concept is to offer fashion and quality at the best price in a sustainable way. The content of this site is copyright-protected and is the property of Gostyle Online Clothing Store.</p> </footer> </div> </div> </div></body></html>`
            }
    

        await sendmail(mailOptions)

        return res.status(200).json({
            success : true,
            message: 'Reset password link send on your email address.',
        })


    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const resetpassword = async (req,res) => {
    try{
        const token = req.params.token;
        const password = req.body.password;

        const {userId} = await verify_token(token)

        if(!userId){
            return  errsendres(res,500,'Unothorized User:')
        }

        const findUser = await User.findById(userId)

        if(!findUser){
            return  errsendres(res,500,'Unothorized User:')
        }

        const vpassword = validatepassword(password)

        if(!password){
            return errsendres(res,500,'Please, Enter your password')
        }else if(!vpassword.isValid){
            return errsendres(res,500,vpassword.validationMessage);
        }

        const user = await User.findByIdAndUpdate(userId,{password : await encrypt_password(password)})

        if(user){
            return res.status(200).json({
                success : true,
                message: 'Password changed successfully'
            })
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const updateuserdetails = async (req, res, nxt) => {
    try{

        const {firstname,lastname} = req.body

        if(!firstname){
            return errsendres(res,500,'Please, Enter your first name')
        }else if(firstname.length < 3 || firstname.length > 20){
            return errsendres(res,500,'First name should be between 3 and 20 characters')
        }

        if(!lastname){
            return errsendres(res,500,'Please, Enter your first name')
        }else if(lastname.length < 3 || lastname.length > 20){
            return errsendres(res,500,'Last name should be between 3 and 20 characters')
        }

        const finduser = await User.findById(req.user_data._id);
        
        if(!finduser){
            return errsendres(res,500,'Unthorized user')
        }

        const user = await finduser.update({
            firstname,
            lastname
        });

        if(user){
            return res.status(200).json({
                success : true,
                message: 'User details updated successfully'
            })
        }

    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const changepassword = async (req, res) => {
    try{
        const user_data = req.user_data;

        if(!user_data){
            return  errsendres(res,500,'Unothorized User: Please be login in')
        }


        const {oldpassword,newpassword} = req.body;

        const finduser = await User.findById(user_data?._id);
        
        if(!finduser){
            return errsendres(res,500,'Unthorized user')
        }

        const vpassword = validatepassword(newpassword)

        if(!newpassword){
            return errsendres(res,500,'Please, Enter your new password')
        }else if(!oldpassword){
            return errsendres(res,500,'Please, Enter your old password')
        }else if(!vpassword.isValid){
            return errsendres(res,500,vpassword.validationMessage);
        }

        const dpassword = await decrypt_password(oldpassword,finduser.password);

        if(!dpassword){
            return errsendres(res,500,'Please, Enter your correct old password')
        }

        const user = await User.findByIdAndUpdate(user_data?._id,{
            password : await encrypt_password(newpassword)
        })

        if(user){
            return res.status(200).json({
                success : true,
                message: 'Password changed successfully'
            })
        }


    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const addlocation = async (req, res) => {
    try{
        const {user_token} = req.cookies;

        if(!user_token){
            return  errsendres(res,500,'Unothorized User: Please be login in')
        }

        const {userId} = await verify_token(user_token);

        const {state,city,address,zip} = req.body

        if(!state){
            return errsendres(res,500,'Please, Enter your state name');
        }else if(state.length > 20 || state.length < 3){
            return errsendres(res,500,'State name should be between 3 and 20 characters');
        }
        
        if(!city){
            return errsendres(res,500,'Please, Enter your city name');
        }else if(city.length > 30 || city.length < 3){
            return errsendres(res,500,'City name should be between 3 and 20 characters');
        }

        if(!address){
            return errsendres(res,500,'Please, Enter your address');
        }

        if(!zip){
            return errsendres(res,500,'Please, Enter your zip code.');
        }else if(zip.length !== 6){
            return errsendres(res,500,'Please, Enter your correct zip code.');
        }

        const finduser = await User.findById(userId);
        
        if(!finduser){
            return errsendres(res,500,'Unthorized user.')
        }

        const user = await User.findByIdAndUpdate(userId,{
            location : {
                state : state,
                city : city,
                address : address,
                zip : zip
            }
        })

        if(user){
            return res.status(200).json({
                success : true,
                message: 'Location added successfully'
            })
        }

    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const delete_account = async (req, res) => {
    try{
        const {user_token} = req.cookies;

        if(!user_token){
            return  errsendres(res,500,'Unothorized User: Please be login in')
        }

        const {userId} = await verify_token(user_token);

        const finduser = await User.findById(userId);
        
        if(!finduser){
            return errsendres(res,500,'Unthorized user.')
        }

       const delete_user =  await finduser.remove();

        if(delete_user){
            return res.status(200).cookie('user_token',null,{
                expires: new Date(Date.now()),
                httpOnly: true,
              }).json({
                success : true,
                message: 'User deleted successfully'
            })
        }

    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const add_review = async (req, res) => {
    try{
        const {product_id} = req.params
        const product = await Products.findById(product_id)

        const {
            user_name,
            r_title,
            rating,
            comment
        } = req.body

        if (!product) {
            return  errsendres(res,500,`Something went wrong : Prdouct Not Found`);
        }

        await product.update({reviews : [{
            user_name,
            r_title,
            rating,
            comment
        },...product.reviews]})

        res.status(200).json({
            success : true,
            message : 'Your Review Submited Successfully.'
        })

    }catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const add_product_in_wishlist = async (req, res, next) => {
    try {

        const User_Data = req.user_data
        const add_To_product = req.body.product


        if(User_Data?.wishlist){
            const wishlist = User_Data.wishlist.filter((product) => {
                if(product._id === add_To_product._id){
                    return product
                }
            })
    
            if(wishlist.length > 0){
                return res.status(200).json({
                    success : true,
                    message : 'Product added to wishlist successfully'
                })
            }
    
        }

        const updated_wishlist = await User.findByIdAndUpdate(User_Data._id,{wishlist : [req.body.product,...User_Data.wishlist]})
    
    
            if(updated_wishlist){
                return res.status(200).json({
                    success : true,
                    message : 'Product added to wishlist successfully'
                })
            }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const remove_product_in_wishlist = async (req, res, next) => {
    try {

        const User_Data = req.user_data
        const remove_To_Product =  req.body.product


        const wishlist = User_Data.wishlist.filter((product) => {
            if(product._id === remove_To_Product._id){
                return product
            }
        })

        if(wishlist.length === 0){
            return res.status(200).json({
                success : true,
                message : 'Product removed from wishlist successfully'
            })
        }

        const update_wishlist = await  User_Data.wishlist.filter((product) => {
            if(product._id !== remove_To_Product._id){
                return product
            }
        })

        const updated_wishlist = await User.findByIdAndUpdate(User_Data._id,{wishlist : update_wishlist})

        if(updated_wishlist){
            return res.status(200).json({
                success : true,
                message : 'Product removed from wishlist successfully'
            })
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const add_address = async (req, res, next) => {
    try {

        const User_Data = req.user_data

        const {firstname,lastname,state,city,address,phone} = req.body

        

        const add_location = await User.findByIdAndUpdate(User_Data._id,{location : [
            {
                name : {
                    firstname,
                    lastname,
                },
                state,
                city,
                address,
                phone : {
                    number : phone 
                }
            },
            ...User_Data.location
        ]})


        if(add_location){
            return res.status(200).json({
                success : true,
                message : 'location added to address book successfully'
            })
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const update_address = async (req, res, next) => {
    try {

        const User_Data = req.user_data

        const {firstname,lastname,state,city,address,phone} = req.body
        const {addressId} = req.params

        
        const update_location = []
        
        await User_Data.location.map((location) => {
            if(location._id.toString() === addressId){
                update_location.push(
                    {
                        _id : location._id,
                        name : {
                            firstname,
                            lastname
                        },
                        state,
                        city,
                        address,
                        phone : {
                            ...location.phone,
                            number : phone
                        }
                    }
                )
            }else{
                update_location.push(location)
            }
        })

        const add_location = await User.findByIdAndUpdate(User_Data._id,{location : update_location})

        if(add_location){
            return res.status(200).json({
                success : true,
                message : 'location updated to address book successfully'
            })
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


const delete_address = async (req, res, next) => {
    try {

        const User_Data = req.user_data

        const {addressId} = req.params

        
        const update_location = []
        
        await User_Data.location.filter((location) => {
            if(location._id.toString() !== addressId){
                update_location.push(
                    location
                )
            }
        })

        const add_location = await User.findByIdAndUpdate(User_Data._id,{location : update_location})

        if(add_location){
            return res.status(200).json({
                success : true,
                message : 'location updated to address book successfully'
            })
        }

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

module.exports = {register_as_customer,login_user,load_user_detail,sendforgetlink,resetpassword,updateuserdetails,changepassword,addlocation,delete_account,logout_customer,add_review,add_product_in_wishlist,remove_product_in_wishlist,add_address,update_address,delete_address}