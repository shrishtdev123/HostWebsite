import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const ShopContext=createContext();

const ShopContextProvider=(props)=>{

    const currency='₹';
    const deliveryfee=10;
    const backendurl=import.meta.env.VITE_BACKEND_URI;
    const [search,setSearch]=useState();
    const [showSearch,setShowSearch]=useState(false);
    const [cartitems,setCartItems]=useState({});
    const navigate=useNavigate();
    const [products,setProducts]=useState([]);
    const [token,setToken]=useState('');


    const addTocart=async(itemId,size)=>{

              if(!size){
                 toast.error("Select product size")
                 return;
              }
            
            let cartData=structuredClone(cartitems);

            if(cartData[itemId])
                {

                 if(cartData[itemId][size]){
                      cartData[itemId][size]+=1;
                 }
                 else{

                     cartData[itemId][size]=1;
                 }
            }
            else
            {
                cartData[itemId]={};
                cartData[itemId][size]=1;
            }

            setCartItems(cartData);

           if(token){

              try 
              {
                 await axios.post(backendurl+'/api/cart/add',{
                      itemId,
                      size
                 },{
                     headers:{
                         token
                     }
                 })
              } 
              catch (error)
               {
                   console.log(error);
                   toast.error(error.message);
                   
              }
           }
    }


 const getCartCount=()=>{

       
          let totalcount=0;

          for(const items in cartitems)
            {

                for(const item in cartitems[items])
                    {
                        try 
                        {
                             
                             if(cartitems[items][item]>0)
                                {
                                  
                                totalcount+=cartitems[items][item]
                               }
                        } 
                        catch (error) 
                        {
                            console.log(error);
                            toast.error(error.message)
                            
                        }
                }
          }

          return totalcount;
 }


  const updateQuantity=async(itemId,size,quantity)=>{


           let cartData=structuredClone(cartitems);

           cartData[itemId][size]=quantity;

           setCartItems(cartData);

           if(token){

               try 
               {
                   await axios.post(backendurl+'/api/cart/update',{
                        itemId,
                        size,
                        quantity
                   },{
                     headers:{
                         token
                     }
                   })
               }
                catch (error) 
               {
                 console.log(error);
                 toast.error(error.message)
               }
           }
          
  }


   const getCartAmount=()=>{
    
         let totalamount=0;

         for(let items in cartitems){

             let iteminfo=products.find((product)=> product._id===items);

             
              for(let item in cartitems[items])
              {
                 try 
                 {
                      if(cartitems[items][item]>0){
                           
                          totalamount+=iteminfo.price*cartitems[items][item]
                      }
                 } 
                 catch (error) 
                 {
                     console.log(error);
                     
                 }
              }
         }

         return totalamount;
           
   }

   // get product from the backend with api

    const getProductData=async()=>{

            try 
            {
                const response=await axios.get(backendurl+'/api/product/list');
                console.log(response.data);
                
                 if(response.data.sucess ){
                      setProducts(response.data.product)
                 }
                 else
                 {
                     toast.error("error")
                 }
                
                
               
            } 
            catch (error) 
            {
                console.log(error);
                toast.error("error of catch block")
                
            }
    }

    // getuser cart

     const getUserCart=async(token)=>{

            try 
            {
                const response=await axios.post(backendurl+'/api/cart/get',{},{
                     headers:{
                         token
                     }
                });

                if(response.data.success){

                     setCartItems(response.data.cartData);
                }


            } 
            catch (error) 
            {
                console.log(error);
                toast.error("error of catch block")
            }
     }

     useEffect(()=>{
         getProductData();
     },[])


     useEffect(()=>{

          if(!token && localStorage.getItem('token')){
           
               setToken(localStorage.getItem('token'));
                getUserCart(localStorage.getItem('token'));
          }
     },[])

       const value={
            products,
            currency,
            deliveryfee,
            search,
            setSearch,
            showSearch,
            setShowSearch,
            cartitems,
            setCartItems,
            addTocart,
            getCartCount,
            updateQuantity,
            getCartAmount,
            navigate,
            backendurl,
            token,
            setToken
       }


    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;