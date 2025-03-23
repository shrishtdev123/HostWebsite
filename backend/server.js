import express, { Router } from "express"
import cors from "cors"
import 'dotenv/config' 
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import router from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app=express();
const port=process.env.port||4000

 connectDB();
connectCloudinary();
// middleware
 app.use(cors());
 app.use(express.json());
 

 // api endspoints

 app.use("/api/user",router);
 app.use("/api/product",productRouter)
 app.use("/api/cart",cartRouter)
 app.use("/api/order",orderRouter)
app.get("/",(req,res)=>{

      res.json({
          msg:"server is running"
      })
})

app.listen(port,()=>{
     console.log('server is running at port number 3400');
     
})