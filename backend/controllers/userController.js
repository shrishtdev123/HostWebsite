import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userController={

    // route for user login
     login:async(req,res)=>{
         
            try 
            {
                const {email,password}=req.body;

                const user=await userModel.findOne({email});

                 if(!user){
                      
                    return res.json({
                        sucess:false,
                        message:"user does not exits"
                   })

                 }


                 const ismatch=await bcrypt.compare(password,user.password)
                

                 if(ismatch)
                    {

                    const token=jwt.sign({
                        id:user._id
                   },process.env.JWT_SCRET)

                   res.json({
                    sucess:true,
                    token
               });
                     
                 }
                 else
                 {

                    res.json({
                         sucess:false,
                         message:"invalide credentials"
                    })
                 }


            } 
            catch (error)
             {
                console.log(error);

                res.json({
   
                    sucess:false,
                    message:error.message
                })
                
            }
          
     },

     //  route for user registeration
     register:async(req,res)=>{


          try 
          {
              const {name,email,password}=req.body;

              // cheaking user already exits or not
              
            const exits=await userModel.findOne({email});

               if(exits){
                 
                 return res.json({
                      sucess:false,
                      message:"user already exits"
                 })
               }

              // validating email formate & strong password

              if(!validator.isEmail(email)){
                 
                return res.json({
                    sucess:false,
                    message:"please enter valide email"
               })
                   
              }

              if(password.length<8){
                 
                return res.json({
                    sucess:false,
                    message:"please enter strong password"
               })
                   
              }


             // hashing user password

             const salt = await bcrypt.genSalt(10);

             const hashedpassword=await bcrypt.hash(password,salt);

             const newuser=await userModel.create({
                    name,
                    email,
                    password:hashedpassword
             })

            
            const token=jwt.sign({
                 id:newuser._id
            },process.env.JWT_SCRET)

            res.json({
                 sucess:true,
                 token
            });
          } 
          catch (error) 
          {
             console.log(error);

             res.json({

                 sucess:false,
                 message:error.message
             })
             
          }
           
         
          
     },

     // route for admin login
     adminLogin:async(req,res)=>{


        try 
        {
          const {email,password}=req.body;
           console.log(req.body);

           console.log(process.env.ADMIN_EMAIL,process.env.ADMIN_PASSWORD);
           
           
          if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
          {
              const token=jwt.sign(email+password,process.env.JWT_SCRET);

              res.json({
                sucess:true,
                token
              })
          }
          else
          {
                res.json({
                    sucess:false,
                    message:"invalid credentials"
                })
          }
          
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


export default userController;