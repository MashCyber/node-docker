const User = require('../models/userModel');
const bcrypt = require("bcryptjs")

exports.signup = async (req,res,next) =>{
    const {username,password} = req.body;
    try{
        const hashpassword = await bcrypt.hash(password, 12)
        const newUser =  await User.create({
            username,
            password:hashpassword
        })
        req.session.user = newUser;
        res.status(201).json({
            status:"Success",
            data: {newUser}
        })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            status:"Error"
        })
    }
} 

exports.login = async (req,res,next) =>{
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({
                status: "Error",
                message:"User Not Found!"
            })
        }
        const isCorrect = await bcrypt.compare(password,user.password)
        if (isCorrect){
            req.session.user = user;
            res.status(200).json({
                status:"Success",
                message:"Successfully logged in!"
            }) 
            console.log(req.session.user)
        }else{
            res.status(400).json({
                status:"Error",
                message:"Incorrect username/password!"
            }) 
        }
    } catch (e) {
        console.log(e)
    }

}


// exports.logout = (req,res,next) =>{
//     try {
//         if(!req.session.user){
//             return res.status(200).json({
//                 status:"Not Found",
//                 message:"User Not Logged In"   
//              })
//         }res.status(200).json({
//             status:"success",
//             message:"User logged out"
//         })
//             req.session.user=null;
//             console.log(req)
//         } catch (error) {
//             console.log(error)
//              res.status(400).json({
//                 status:"Error"
//             })
//     }
// }