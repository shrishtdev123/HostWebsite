
import express from "express"
import productController from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter=express.Router();

productRouter.post("/add",adminAuth,
    upload.fields([{name:'image1',maxCount:1},
        {name:'image2',maxCount:1},
        {name:'image3',maxCount:1},
        {name:'image4',maxCount:1}]),
    productController.addProduct);
productRouter.post("/remove",adminAuth,productController.removeproduct);
productRouter.get("/single/:id",productController.singleProduct);
productRouter.get("/list",productController.listProduct);

export default productRouter;