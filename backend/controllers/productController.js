import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";

const productController={

        // function to add product

        addProduct:async(req,res)=>{
    
               try 
               {

                   const {name,description,price,category,subCategory,sizes,  bestseller}=req.body


                   const image1=req.files.image1 && req.files.image1[0];
                   const image2=req.files.image2 && req.files.image2[0];
                   const image3=req.files.image3 && req.files.image3[0];
                   const image4=req.files.image4 && req.files.image4[0];

                   const images=[image1,image2,image3,image4].filter((item)=>item!=undefined);

                  let imagesUrl=await Promise.all(
                     images.map(async(item)=>{

                         let result=await cloudinary.uploader.upload(item.path,{
                              resource_type:'image'
                         })

                         return result.secure_url;
                     })
                  )

               //   console.log(req.body);
               //   console.log(imagesUrl);

               const productData={
                    
                      name,
                      description,
                      category,
                      price:Number(price),
                      subCategory,
                      bestseller:bestseller==="true"?true:false,
                      sizes:JSON.parse(sizes),
                      image:imagesUrl,
                      date:Date.now()
               }
              console.log(productData);


              const product=await productModel.create(productData);
              
                 res.json({
                       sucess:true,
                       product
                 })
                 
                 
                
               } 
               catch (error) 
               {
                  console.log(error);
                  res.json({
                     sucess:false,
                     Message:error.Message
                  })
               }
                 
              
        },

        // function for list product

        listProduct:async(req,res)=>{

                  try 
                  {
                      const product=await productModel.find({});

                      res.json({
                         sucess:true,
                         product
                      })
                  } 
                  catch (error) 
                  {
                     console.log(error);
                     res.json({
                        sucess:false,
                        Message:error.Message
                     })
                  }
                
        },

        // remove product

        removeproduct:async(req,res)=>{

             try 
             {
               
               const {id}=req.body;
               console.log(id);
               

               await productModel.findByIdAndDelete(id);
  
               res.json({
                   sucess:true,
                   message:"product is removed"
                 
               })
             } 
             catch (error) 
             {
               console.log(error);
               res.json({
                  sucess:false,
                  Message:error.Message
               })
             }

            
        },

        // function for signle product info

        singleProduct:async(req,res)=>{
               
         try 
         {
           
           const {id}=req.params;

           const product=await productModel.findById(id);

           res.json({
               sucess:true,
               product
             
           })
         } 
         catch (error) 
         {
           console.log(error);
           res.json({
              sucess:false,
              Message:error.Message
           })
         }
        }


}

export default productController;
