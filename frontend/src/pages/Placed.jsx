import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placed = () => {

    const [method,setMethod]=useState("cod");
    const {navigate,backendurl,token,cartitems,setCartItems,deliveryfee,products,  getCartAmount}=useContext(ShopContext);

    const [formData,setFormData]=useState({
            firstName:'',
            lastName:'',
            email:'',
            street:'',
            city:'',
            state:'',
            zipcode:'',
            country:'',
            phone:''
    })

    const onchangehandler=(event)=>{

         const name=event.target.name;

         const value=event.target.value;

         setFormData(data=>({...data,[name]:value}))
    }

    const onSubmithandler=async(e)=>{
          e.preventDefault();
        
        try 
        {
           let orderItems=[];
         
            
               for(const items in cartitems)
               {
                  
                 for(const item in  cartitems[items])
                 {

                   
                  if(cartitems[items][item]>0)
                    {
                      
                  const itemInfo=structuredClone(products.find((product)=>product._id===items))

                       if(itemInfo)
                        {
                            
                          
                             itemInfo.size=item
                             itemInfo.quantity=cartitems[items][item]
                              console.log(itemInfo);
                              
                             orderItems.push(itemInfo);
                           
                       }

                  }
                 }
               }

              
              let orderData={
                  address:formData,
                  items:orderItems,
                  amount:getCartAmount()+deliveryfee
              }

              switch(method){
                     
                  // api calls for cod order

                  case 'cod':
                    try 
                    {
                      const response = await axios.post(backendurl + '/api/order/place', orderData, {
                        headers: { token }
                      });

                       if(response.data.success){
                         setCartItems({});
                         navigate('/order')
                       }
                       else
                       {
                          toast.error(response.data.message)
                       }
                      console.log("order response",response.data); // Log success response
                    } catch (error) {
                      console.error("Order placement failed:", error);
                    }
                    break;
                    case 'stripe':
                      try 
                      {
                        const responseStripe=await axios.post(backendurl+'/api/order/stripe',orderData,{
                           headers:{
                            token
                           }
                        })

                         if(responseStripe.data.success){

                             const {session_url}=responseStripe.data;
                              window.location.replace(session_url);
                         }
                         else{
                          toast.error(responseStripe.data.message)
                         }
                      } 
                      catch (error) {
                        console.error("Order placement failed:", error);
                      }
                      break;

                    default:
                      break;
              }
               
        } 
        catch (error) 
        {
          console.log(error);
          toast.error(error.message)
          
        }
         
    }

  return (
    <form onSubmit={onSubmithandler} className=' border-none flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-4 min-h-[80vh] border -t '>
        {/*-------------------- left side----------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
       
            <div className='text-xl sm:text-2xl my-3'>
                <Title
                  text1={'DELIVERY'}
                  text2={'INFORMATION'}
                />
            </div>

          <div className='flex gap-3'>
                 <input
                    required
                    onChange={onchangehandler}
                    name="firstName"
                    value={formData.firstName}
                   className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
                 <input
                     required
                    onChange={onchangehandler}
                    name="lastName"
                    value={formData.lastName}
                   className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
          </div>
          <input
                required
               onChange={onchangehandler}
                    name="email"
                    value={formData.email}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />

          <input 
                   required
                   onChange={onchangehandler}
                    name="street"
                    value={formData.street}
           className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

          <div className='flex gap-3'>
                 <input 
                    onChange={onchangehandler}
                    name="city"
                    value={formData.city}
                    required
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                 <input 
                     onChange={onchangehandler}
                    name="state"
                    value={formData.state}
                    required
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
          </div>

          <div className='flex gap-3'>
                 <input 
                      onChange={onchangehandler}
                    name="zipcode"
                    value={formData.zipcode}
                    required
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                 <input 
                     onChange={onchangehandler}
                    name="country"
                    value={formData.country}
                    required
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
          </div>

          <input
              onChange={onchangehandler}
                    name="phone"
                    value={formData.phone}
                    required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>

      {/* ------------Right side---------------------- */}

       <div className='mt-8'>
           <div className='mt-8 min-w-80'>
               <CartTotal/>
           </div>

           <div className='mt-12'>
               <Title
                 text1={'PAYMENT'}
                 text2={'METHOD'}
               />

                {/* Payment method selection */}
               <div className='flex gap-3 flex-col lg:flex-row'>
                   
                      <div onClick={()=>setMethod("stripe")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                         <p className={`min-w-3.5 h-3.5 border rounded-full
                             ${method==='stripe'?'bg-green-400':''}
                         `}></p>
                          <img className='h-5 max-4' src={assets.stripe_logo} alt="" />
                      </div>

                      <div onClick={()=>setMethod("razorpay")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                         <p className={`min-w-3.5 h-3.5 border rounded-full
                                 ${method==='razorpay'?'bg-green-400':''}
                         `}></p>
                          <img className='h-5 max-4' src={assets.razorpay_logo} alt="" />
                      </div>

                      <div onClick={()=>setMethod("cod")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                         <p className={`min-w-3.5 h-3.5 border rounded-full
                                 ${method==='cod'?'bg-green-400':''}
                         `}></p>
                         <p className='text-gray-500 text-sm font-medium mx-4'>CAHS ON DELIVER</p>
                      </div>
               </div>

               <div className='w-full text-end mt-8'>
                   
                      <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACED ORDER</button>
               </div>
           </div>
       </div>

       

    </form>
  )
}

export default Placed