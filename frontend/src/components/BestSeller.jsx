import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

   const {products}=useContext(ShopContext);
   const [bestseller,setBestseller]=useState([]);

   useEffect(()=>{

        const data=products.filter((item)=>item.bestseller===true);
        setBestseller(data.slice(0,5));
       
   },[products])

    console.log(bestseller);
    

  return (
    <div className='my-10'>
         <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia error non adipisci aliquid suscipit, repellat laboriosam eum mollitia recusandae ex delectus repudiandae inventore, nulla magni quo impedit numquam corporis sint?
            </p>
         </div>
     
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
              
              {
                bestseller.map((item,index)=>(
                     <ProductItem
                         key={index}
                         id={item._id}
                         image={item.image}
                         name={item.name}
                         price={item.price}
                     />
                  ))
              }
                 
          </div>

    </div>
  )
}

export default BestSeller