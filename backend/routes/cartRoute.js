import express from "express"
import cartCobtroller from "../controllers/cartController.js"
import authUser from "../middleware/auth.js";

const cartRouter=express.Router();

cartRouter.post("/get",authUser,cartCobtroller.getUserCart);
cartRouter.post("/add",authUser,cartCobtroller.addToCart);
cartRouter.post("/update",authUser,cartCobtroller.updateCart);



export default cartRouter;