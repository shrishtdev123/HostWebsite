import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

    const {id}=useParams();
    const {products,currency,addTocart}=useContext(ShopContext);
     const [productData,setProductData]=useState(false);

     const [image,setImage]=useState();
     const [size,setSize]=useState("");



     const fetchproductdata=async()=>{
        products.map((item)=>{
              
              if(item._id===id){
                setProductData(item)
                setImage(item.image[0]);
                return;
              }
        })
           
     }

     useEffect(()=>{
          fetchproductdata();
     },[id,products])
    
     console.log(productData);
     
  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
     {/* --------------product data------------------ */}
    <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* ----------------product images--------------------- */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-[18.7%]'>
                  {
                     productData.image.map((item,index)=>(
                        <img onClick={()=>setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' src={item} key={index} alt="" />
                     ))
                  }
            </div>

            <div className='w-full sm:w-[80%]'>
               <img className='w-full h-auto'  src={image} alt="" />
            </div>
        </div>

        {/* ---------Product Info */}

        <div className='flex-1'>
           <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

           <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
           </div>

            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 w-4/5'>{productData.description}</p>

            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                 {
                   productData.sizes.map((item,index)=>(
                     <button
                       onClick={()=>setSize(item)}
                      className={`border py-2 px-3 bg-gray-100 ${item===size?"bg-green-400":""}`} key={index}>{item}</button>
                   ))
                 }
              </div>
            </div>

              <button
                onClick={()=>addTocart(productData._id,size)}
               className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>

            <hr className='mt-8 sm:w-4/5' />

            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                 <p>100% Orginal product</p>
                 <p>Cash on delivery on the product.</p>
                 <p>Easy return and exhange policy within 7 days</p>
            </div>
        </div>
    </div>
        {/*-------------- Description Section And Review Section-------------- */}

       <div className='mt-20'>

         <div className='flex'>
             
             <b className='border px-5 py-3 text-sm'>Description</b>
             <p className='border px-5 py-3 text-sm'>Reviwes(122)</p>
         </div>

         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>

               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque incidunt modi recusandae doloribus veniam nesciunt odit perspiciatis, rerum alias repudiandae excepturi adipisci fuga itaque, eaque tempore id aliquid animi atque?</p>

               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi soluta beatae ad consectetur dicta eligendi culpa aperiam, tenetur quis magnam perferendis corrupti minus ducimus ratione omnis libero ullam accusamus enim?</p>
         </div>
       </div>

           {/*-----------display related product----------------- */}
           <RelatedProduct category={productData.category}
                          subCategory={productData.subCategory}
           />
    </div>
  ):<div className='opacity-0'></div>
}

export default Product