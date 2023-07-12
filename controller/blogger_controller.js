const Blogger = require('../model/Blogger')
const validate_email = require('validate-email');
const validatepassword = require('../utils/validatepassword');
const errsendres = require('../utils/errsendres');
const { encrypt_password, genrate_token, decrypt_password, verify_token } = require('../utils/token-bcrypt');
const Magazine = require('../model/magazine');

const register_as_blogger = async (req,res) => {
    try{
        const {firstname, lastname, email, password} = req.body

        const already_user = await Blogger.findOne({email})

        if(already_user){
            return errsendres(res, 400, 'User is already registered')
        }

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

        const blogger = await Blogger.create({
            firstname,
            lastname,
            email,
            password : await encrypt_password(password),
        })

        const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

        const token = await genrate_token({bloggerId : blogger._id.toString()},'24h')

        if(blogger){
            return res.status(201).cookie('blogger_token',token,options).json({
                success : true,
                message: 'User created successfully',
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
        }else{
            return  errsendres(res,500,`Internal Server Error. User not created.`)
        }



    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const login_blogger = async (req,res) => {
    try{
        const {email,password} = req.body;

        const blogger = await Blogger.findOne({email})

        if(!blogger){
            return errsendres(res,500,'Invalid username or password.')
        }

        const dpassword = await decrypt_password(password,blogger.password);

        if(!dpassword){
            return errsendres(res,500,'Invalid username or password.')
        }

        const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
        
        const token = await genrate_token({bloggerId : blogger._id.toString()},'24h');

        return res.status(200).cookie('blogger_token',token,options).json({
            success : true,
            message: 'User logged in successfully',
            data : {
                id:blogger._id,
                firstname : blogger.firstname,
                lastname : blogger.lastname,
                email : blogger.email,
                role : blogger.role,
                followers : blogger.followers,
                blogs : blogger.blogs,
                profile : blogger.profile
            },
            token
        })

    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const logout_blogger = async (req,res) => {
    try {
        res.cookie('blogger_token',null,{
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

const load_blogger_detail = async (req,res) => {
    try{
        const blogger_data = req.blogger_data

        if(!blogger_data){
            return  errsendres(res,500,'Unothorized User: Please be login in')
        }

        const blogger = await Blogger.findOne({_id : blogger_data._id})

        if(blogger){
            return res.status(200).json({
                success : true,
                message: 'User data loaded successfully',
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
        }
        
    }catch(error){
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const blogger_send_forget_link = async (req,res) => {
    try {
        const useremail = req.params.email

        const blogger = await Blogger.findOne({email : useremail})

        if(!blogger){
            return  errsendres(res,404,'Internal server Error')
        }

        const token  = await genrate_token({bloggerId : blogger._id.toString()},'15m')
        const genrate_link = `http://${process.env.DASHBOAD_BASE_URI}/forget/password/link/${token}`

        return res.status(200).json({
            success : true,
            message: 'Password link sent successfully',
            link : genrate_link
        })

        // return sendmail(req,res,200,to_user,subject,message)

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}

const blogger_reset_password = async (req,res) => {
    try{
        const token = req.params.token;
        const password = req.body.password;

        const vtoken = await verify_token(token)

        if(!vtoken){
            return  errsendres(res,500,'Invalid token or token have been expired.')
        }

        const findBlogger = await Blogger.findById(vtoken.bloggerId)

        if(!findBlogger){
            return  errsendres(res,500,'Unothorized User:')
        }

        const vpassword = validatepassword(password)

        if(!password){
            return errsendres(res,500,'Please, Enter your password')
        }else if(!vpassword.isValid){
            return errsendres(res,500,vpassword.validationMessage);
        }

        const blogger = await Blogger.findByIdAndUpdate(bloggerId,{password : await encrypt_password(password)})

        if(blogger){
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

const update_blogger_details = async (req, res, nxt) => {
    try{
        const blogger_data = req.blogger_data

        if(!blogger_data){
            return  errsendres(res,500,'Unothorized User: Please be login in')
        }

        const {firstname,lastname,profile} = req.body


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

        if(!profile){
            return errsendres(res,500,'Please, Enter your phone number');
        }

        const findBlogger = await Blogger.findById(blogger_data._id);
        
        if(!findBlogger){
            return errsendres(res,500,'Unthorized user')
        }

        const blogger = await Blogger.findByIdAndUpdate(findBlogger,{
            firstname,
            lastname,
            profile
        });

        if(blogger){
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

const blogger_change_password = async (req, res) => {
    try{
        const blogger_data = req.blogger_data

        if(!blogger_data){
            return  errsendres(res,500,'Unothorized User: Please be login in')
        }

        const {oldpassword,newpassword} = req.body;

        const findblogger = await Blogger.findById(blogger_data._id);
        
        if(!findblogger){
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

        const dpassword = await decrypt_password(oldpassword,findblogger.password);

        if(!dpassword){
            return errsendres(res,500,'Please, Enter your correct old password')
        }

        const blogger = await Blogger.findByIdAndUpdate(bloggerId,{
            password : await encrypt_password(newpassword)
        })

        if(blogger){
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

const create_magazine = async (req, res) => {
    try {
        const blogger_data = req.blogger_data
        
        const {cover_image, title,summary,content} = req.body

        const magazine = await Magazine.create(
            {cover_image,
        title,
        summary,
        upload_date : Date.now(),
        author : blogger_data._id,
        content
            })

        res.status(200).json({
            success : true,
            data : magazine
        })

    } catch (error) {
        console.log(`something went wrong : ${error.message}`);
        return  errsendres(res,500,`something went wrong : ${error.message}`);
    }
}


module.exports = {register_as_blogger,login_blogger,logout_blogger,load_blogger_detail,blogger_send_forget_link,blogger_reset_password,update_blogger_details,blogger_change_password,create_magazine}