const validate_password = require('validate-password');

var options = {
    enforce: {
        lowercase: true,
        uppercase: true,
        specialCharacters: false,
        numbers: true
    }
};

var validator = new validate_password(options);

const validatepassword = (password) => {
    return validator.checkPassword(password);
}


module.exports = validatepassword