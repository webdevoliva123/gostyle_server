const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const {OAuth2} = google.auth

const {CLIENT_ID,CLIENT_SECRECT,WEB_EMAIL,REFRESH_TOKEN,BASE_URL} = process.env

const OAuth2Link  = "https://developers.google.com/oauthplayground"

const auth = new OAuth2(CLIENT_ID,CLIENT_SECRECT,OAuth2Link);


exports.sendmail = (mailOptions) => {
    
    auth.setCredentials({
        refresh_token : REFRESH_TOKEN,
    })   

    const accessToken = auth.getAccessToken();
    const smtp = nodemailer.createTransport({
        service : "gmail",
        auth : {
            type : "OAuth2",
            user : WEB_EMAIL,
            clientId : CLIENT_ID,
            clientSecret : CLIENT_SECRECT,
            refreshToken : REFRESH_TOKEN,
            accessToken
        }
    })

    smtp.sendMail(mailOptions,(err, res) => {
        if (err){
            console.log(err);
            return err
        }

        return res
    })
}