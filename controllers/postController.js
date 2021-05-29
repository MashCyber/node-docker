const Post = require('../models/postModels')
const { post } = require('../routes/postRoutes')

//localhost:3000/posts
exports.getAllPosts = async (req,res,next) =>{
    try {
        const posts = await Post.find()
        res.status(200).json({
            status : 'success',
            results: posts.length,
            data: {
                 posts
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status:'Error'
        })
    }
}

//localhost:3000/posts/:id ==> specific post
exports.getOnePost = async(req,res,next) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id)
        res.status(200).json({
            status : 'success',
            data: {
                 post
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status:'Error'
        })
    }
}

exports.createPost = async(req,res,next) => {
    try {
        const post = await Post.create(req.body)
        res.status(200).json({
            status : 'success',
            data: {
                 post
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status:'Error'
        })
    }

}

//Update
exports.updatePost = async(req,res,next) => {
    try {
        const {id} = req.params;
        const post = await Post.findByIdAndUpdate(id,req.body, {
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status : 'success',
            data: {
                 post
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status:'Error'
        })
    }
}


exports.deletePost = async (req,res,next) =>{
 try {
     const {id} = req.params
     const post = await Post.findByIdAndDelete(id)
    res.status(200).json({
        status:"Success"
    })
 } catch (e) {
    console.log(e)
    res.status(400).json({
        status:'Error'
    })
 }
}

exports.deleteAllPost = async (req,res,next) =>{
    try {
        const posts = await Post.find();
        if (posts.length){
            const delPosts = await Post.deleteMany();
            res.status(200).json({
                status:"Success",
                data:{
                    posts: "All posts deleted"
                }})
        }else{
            res.status(200).json({
                status:"Success",
                data:{
                    posts: "No Posts Available"
                    } 
                })
            }
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: "Error"
        })
    }
}