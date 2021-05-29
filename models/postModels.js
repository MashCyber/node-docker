const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Post Must Include Title!"],
        unique:[true,"Title must be Unique!"]
    },
    body:{
        type:String,
        required:[true, "Post Must Include Body!"]
    },
})

const Post = mongoose.model("Post",postSchema)
module.exports = Post;