const jwt = require('jsonwebtoken');

const genrate_token = (id,exp) => {
    return jwt.sign(id,process.env.SECRET_KEY,{
        expiresIn: exp
    })
}

const verify_token = (token) => {
    return jwt.verify(token,process.env.SECRET_KEY)
}

module.exports = {
    genrate_token,
    verify_token,
}