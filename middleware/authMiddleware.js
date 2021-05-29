const isLoggedIn = (req,res,next) =>{
    const { user } = req.session
    if(!user){
        return res.status(401).json({
            status:"ERROR",
            message:"Unauthorized!!!"
        })
    }
    req.user=user;
    next()
}

module.exports = isLoggedIn;