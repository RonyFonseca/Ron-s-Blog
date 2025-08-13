import PostController from "../Controllers/PostController.js";
import express from "express";
import postController from "../Controllers/PostController.js";

const router = express.Router(); 

router.post("/createPost", PostController.createPost);
router.put("/editPost/:idPost", PostController.editPost);
router.get("/getPost/:idPost", postController.getPostById);
router.post("/likedPost/:idPost", PostController.likedPost)
router.post("/savePost/:idPost", PostController.savePost)
router.get("/mySaves", PostController.getSavedPosts)
router.post("/comentPost/:idPost", PostController.comentPost);
router.delete("/deletePost/:idPost", PostController.deletePost);
router.get("/getAllPost", PostController.getAllPost);
router.get("/myPosts", PostController.getMyPosts);
export default router;