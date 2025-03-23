import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {


    const {products,currency,cartitems,updateQuantity,navigate}=useContext(ShopContext);

         const [cartdata,setCartdata]=useState([]);

         useEffect(()=>{
    
             const tempData=[];

              for(const items in cartitems)
                {

                    for(const item in cartitems[items])
                    {
                           if(cartitems[items][item]>0){

                              tempData.push({

                                    _id:items,
                                    size:item,
                                    quantity:cartitems[items][item]
                              })
                           }

                    }
              }

              setCartdata(tempData);
              
               
         },[cartitems])
  return (
    <div className='border-t pt-14'>
         <div className='text-2xl mb-3'>
               <Title text1={'YOUR'} text2={'CART'}/>
         </div>

         <div>
             {
               cartdata.map((item,index)=>{
                  
                   const productdata=products.find((product)=>product._id===item._id);

                  return(
                     <div className='py-4 border-t border-b text-gray-700
                          grid grid-cols-[4fr_0.5fr_0.5fr]
                          sm:grid-cols-[4fr_2fr_0.5fr]
                          item-center
                          gap-4
                     ' key={index}>

                        <div className='flex items-start gap-6'>

                        <img className='w-16 sm:w-20' src={productdata.image[0]} alt="" />
                          <div>
                           <p className='text-xs sm:text-lg font-medium'>{productdata.name}</p>

                           <div className='flex items-center gap-5 mt-2'>
                                 <p>{currency}{productdata.price}</p>
                                 <p className='px-2 sm:px-3 sm:py-1 border bg:slate-50'>{item.size}</p>
                           </div>
                          </div>
                        </div>
                        
                         <input
                           onChange={(e)=>e.target.value==='' || e.target.value==='0'?null:updateQuantity(item._id,item.size,Number(e.target.value))}
                          className='
                           border mt-9 h-10 w-10 px-1 sm:px-2
                         ' type="number" min={1} defaultValue={item.quantity} />

                         <img  
                          onClick={()=>updateQuantity(item._id,item.size,0)}

                         className=' mt-11 w-4 sm:w-5  cursor-pointer mr-4' src={assets.bin_icon} alt="" />
                     </div>
                  )

               })
             }
         </div>

            <div className='flex justify-end my-20'>
               <div className='w-full sm:w-[450px]'>
                       <CartTotal/>

                       <div className='w-full text-end'>
                            <button
                              onClick={()=>navigate('/place-order')}
                             className='bg-black  text-white text-sm my-8 py-3'>
                               PROCEED TO CHEAKOUT
                            </button>
                       </div>
               </div>

            </div>
    </div>
  )
}

export default Cart