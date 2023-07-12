const errsendres = (res,status,message) => {
   return res.status(status).json({
        success : false,
        error : message,
   })
}

module.exports = errsendres