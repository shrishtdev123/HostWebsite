import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

  // gloabla vairable

  const currency='inr'
  const deliveryCharges=10;
// gateway intialize
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
const orderController={

      // Placing orders using COD order
      placedOrder:async(req,res)=>{
            
            try 
            {
                 const {userId,items,amount,address}=req.body;
                 const orderData={
                       userId,
                       items,
                       address,
                       amount,
                       paymentMethod:"COD",
                       payment:false,
                       date:Date.now()
                 }

               const newOrder=new orderModel(orderData);
                  await newOrder.save();

                  await userModel.findByIdAndUpdate(userId,{cartData:{}});

                  res.json({
                       success:true,
                       message:"Order Placed"
                  })
            } 
            catch (error) 
            {
                console.log(error);
                res.json({
                     success:false,
                     message:error.message
                })
                
            }
      },

      verifyStripe:async(req,res)=>{

          const {orderId,success,userId}=req.body;
             try 
             {
                 
                  if(success==="true"){
                   
                      await orderModel.findByIdAndUpdate(orderId,{payment:true});
                      
                      await userModel.findByIdAndUpdate(userId,{cartData:{}});

                      res.json({
                           sucess:true
                      })

                  }
                  else{

                     await orderModel.findByIdAndDelete(orderId);
                     res.json({
                         sucess:false
                    })
                  }


             } 
             catch (error)
              {
               console.log(error);
               res.json({
                    success:false,
                    message:error.message
               })
               
             }
      },
       // Placing orders using Strip method
       placedOrderStrip:async(req,res)=>{
         
            
               try 
               {
                    const {userId,items,amount,address}=req.body;
                    const {origin}=req.headers;
                      console.log(req.body);
                      
                    const orderData={
                         userId,
                         items,
                         address,
                         amount,
                         paymentMethod:"stripe",
                         payment:false,
                         date:Date.now()
                   }

                   const newOrder=new orderModel(orderData);
                   await newOrder.save();

                   const line_items=items.map((item)=>(
                    {
                          price_data:{
                               currency:currency,
                               product_data:{
                                   name:item.name
                               },
                               unit_amount:item.price*100
                          },
                          quantity:item.quantity

                    }
                   ))

                   line_items.push({

                    price_data:{
                         currency:currency,
                         product_data:{
                             name:"Delivery Charges"
                         },
                         unit_amount:deliveryCharges*100
                    },
                    quantity:1

                   })

                   // create new session

                   const session=await stripe.checkout.sessions.create({
                      
                    success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
                    cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
                    line_items,
                    mode:'payment',
                   })


                   res.json({
                      success:true,
                      session_url:session.url
                   })
               } 
               catch (error) 
               {
                    console.log(error);
                    res.json({
                     success:false,
                     message:error.message
                })
               }
       },

        // Placing orders using Razorpay
      placedOrderRazorpay:async(req,res)=>{
         
      },

      // All orders data for Admin Panel
      allOrders:async(req,res)=>{

           
               try 
               {
                     const orders=await orderModel.find({});

                     res.json({
                          success:true,
                          orders
                     })


               } 
               catch (error) 
               {
                     console.log(error);
                     res.json({
                         success:false,
                         message:error.message
                    })
               }
      },

      // User Order data for Frontend
      userOrder:async(req,res)=>{
            
            try 
            {
                 const {userId}=req.body;
                 const orders=await orderModel.find({userId})

                 res.json({
                        success:true,
                        orders
                 })
            } 
            catch (error) 
            {
                 console.log(error);
                 res.json({
                      success:false,
                      message:error.message
                 })
            }
           
      },

      //update order status from Admin Panel
      updateStaus:async(req,res)=>{
            
              try
              {
                  const {orderId,status}=req.body;

                  await orderModel.findByIdAndUpdate(orderId,{status});

                  res.json({
                      sucess:true,
                      message:"Status Updated"
                  })
               
              } 
              catch (error)
               {
                    console.log(error);
                   res.json({
                      sucess:false,
                      message:error.message
                 })
              }
            
      }
}

export default orderController;

