import userModel from "../models/userModel.js";

const cartCobtroller={

         //add product to user cart

        addToCart:async(req,res)=>{
       
            try {
                const { userId, itemId, size } = req.body;
        
                // Fetch user data
                const userData = await userModel.findById(userId);
        
                console.log(req.body);
                console.log(userData);
        
                // Ensure userData exists
                if (!userData) {
                    return res.json({
                        success: false,
                        message: "User not found"
                    });
                }
        
                // Ensure cartData exists
                let cartData = userData.cartData || {};
        
                // Ensure cartData[itemId] exists
                if (!cartData[itemId]) {
                    cartData[itemId] = {};
                }
        
                // Ensure cartData[itemId][size] exists
                if (!cartData[itemId][size]) {
                    cartData[itemId][size] = 0;
                }
        
                // Increment quantity
                cartData[itemId][size] += 1;
        
                // Update the database
                await userModel.findByIdAndUpdate(userId, { cartData });
        
                res.json({
                    success: true,
                    message: "Added to Cart"
                });
            } catch (error) {
                console.log(error);
                res.json({
                    success: false,
                    message: error.message
                });
            }
        },

        // update user  carts
        updateCart:async(req,res)=>{

             try 
             {
                 const {userId,itemId,size,quantity}=req.body

                 const userData=await userModel.findById(userId);

                 let cartData=userData.cartData;

                 cartData[itemId][size]=quantity;

                 await userModel.findByIdAndUpdate(userId,{cartData});

                       res.json({
                         success:true,
                         message:"Cart Updated"
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

        // get usercart data
        getUserCart:async(req,res)=>{

                 try 
                 {
                     const {userId}=req.body

                     const userData=await userModel.findById(userId);

                     let cartData=userData.cartData;

                     res.json({
                          success:true,
                          cartData
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
            
        }
}

export default cartCobtroller;