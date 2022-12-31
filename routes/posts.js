const express = require('express');
const postRouter = express.Router();
const { verifyToken } = require('../middleware/authBearerToken');
const PostController = require("../controllers/postController");
const {
    postValidationMiddleWare,
    updatePostValidationMiddleware
} = require('../validators/posts.validator')


// Create Post
postRouter.post("/", verifyToken, postValidationMiddleWare, PostController.createPost);

// Get Post by ID
postRouter.get("/:id", verifyToken, PostController.getPost);

// Get All Posts or Search by Title, author or tag
postRouter.get("/", verifyToken, PostController.getAllPosts);

// Update A Post
postRouter.put("/:id", verifyToken, updatePostValidationMiddleware, PostController.updatePost);

// Delete A Post
postRouter.delete("/:id", verifyToken, PostController.deletePost);




// router.put("/:id", verifyToken, async (req, res)=> {
//         const post = await Post.findOne({ id:req.params.id }).populate("author")
//         console.log(typeof req.user.id)
//         console.log(typeof JSON.stringify(post.author))
        
//         if(JSON.stringify(req.user.id) === JSON.stringify(post.author)){
            
//             const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
//                 $set: req.body
//               },
//               {new: true}
//               );
//               res.status(200).json({
//                   message: "Post has been updated!",
//                   updatedPost
//               });
//         } else {
//             console.log("error")
//         }
// });

// router.put("/:id", verifyToken, async (req, res)=> {
//         const postId = req.params.id
//         console.log(postId)
//         const userId = req.user.id
//         const foundBlog = await Post.findById(userId)
//         if(foundBlog && foundBlog.author === userId){
//             const post = req.body
//             console.log(post)
//             post.lastUpdateAt = new Date()
//             await Post.findByIdAndUpdate(postId, post, {new: true})
//             .then(newPost => {
//                 res.status(200).send({"message": "Post updated successfully!", newPost})
//             }).catch(err => {
//                 console.log(err)
//             })
//         } else {
//             console.log("not updated!")
//         }
// });

module.exports = postRouter