import express from "express"
import orderController from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter=express.Router();

// Admin Features
orderRouter.post("/list",adminAuth,orderController.allOrders);
orderRouter.post("/status",adminAuth,orderController.updateStaus);

// Payment Features
orderRouter.post("/place",authUser,orderController.placedOrder);
orderRouter.post("/stripe",authUser,orderController.placedOrderStrip);
orderRouter.post("/razorpay",orderController.placedOrderRazorpay);

// user features
orderRouter.post("/userorders",authUser,orderController.userOrder)

// verify payment
orderRouter.post("/verifyStripe",authUser,orderController.verifyStripe);

export default orderRouter;