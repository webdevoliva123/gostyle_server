const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const genrate_token = (id,exp) => {
    return jwt.sign(id,process.env.SECRET_KEY,{
        expiresIn: exp
    })
}

const verify_token = (token) => {
    return jwt.verify(token,process.env.SECRET_KEY)
}

const encrypt_password = (password) => {
    return bcrypt.hash(password,10)   
}

const decrypt_password =  (password,hashpass) => {
    return  bcrypt.compare(password,hashpass);
}


module.exports = {
    genrate_token,
    verify_token,
    encrypt_password,
    decrypt_password
}