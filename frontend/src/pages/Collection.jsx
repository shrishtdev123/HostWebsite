import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

    const {products,search,showSearch}=useContext(ShopContext);

    const [showfilter,setShowfilter]=useState(false);
    const [filterproducts,setFilterproduct]=useState([]);
    const [category,setCategory]=useState([]);
    const [subCategory,setSubCategory]=useState([]);
    const [sortType,setsortType]=useState("relavant");

    const toggleCategy=(e)=>{

           if(category.includes(e.target.value))
            {
                 setCategory(prev=>prev.filter(item=>item!==e.target.value))
            }
            else
            {
                  setCategory(prev=>[...prev,e.target.value]);
            }

    }


    const toggleSubCategory=(e)=>{
         
        if(subCategory.includes(e.target.value))
        {
              setSubCategory(prev=>prev.filter(item=>item!==e.target.value))
        }
        else
        {
              setSubCategory(prev=>[...prev,e.target.value])
        }
    }


    // apply filter

     const applyfilter=()=>{
         
            let productsCopy=products.slice();


          if(showSearch && search)
            {
                productsCopy=productsCopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()));
                 
          }

          if(category.length>0){
              productsCopy=productsCopy.filter((items)=>category.includes(items.category))
          }

          if(subCategory.length>0){

               productsCopy=productsCopy.filter((items)=>subCategory.includes(items.subCategory));
          }

          setFilterproduct(productsCopy);
     }

    // sorting of product 

      const Sortproduct=()=>{
           
               let fpCopy=filterproducts.slice();

               switch(sortType){

                   case 'low-high':
                        setFilterproduct(fpCopy.sort((a,b)=>(a.price-b.price)))
                        break;
                   case 'high-low':
                    setFilterproduct(fpCopy.sort((a,b)=>(b.price-a.price)))
                    break;
                    default:
                        applyfilter();
                        break;
               }

      }

       useEffect(()=>{
            

             applyfilter();
       },[category,subCategory,search,showSearch,products]);

      useEffect(()=>{

             Sortproduct();
      },[sortType]);
     

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
       
        {/* filter options */}

        <div className='min-w-60'>
              <p  onClick={()=>setShowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                <img className={`h-3 sm:hidden ${showfilter?'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
              </p>
              {/* Catrgory filter */}

            <div 
            className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter?'':'hidden'} sm:block`}>
               <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
               <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                     <input onChange={toggleCategy} className='w-3'  type="checkbox" value={'MEN'} />Men
                    </p>

                    <p className='flex gap-2'>
                     <input  onChange={toggleCategy} className='w-3'  type="checkbox" value={"Women"} />Women
                    </p>

                    <p className='flex gap-2'>
                     <input  onChange={toggleCategy} className='w-3'  type="checkbox" value={"Kids"} />Kids
                    </p>
               </div>
            </div>

            {/* Sub  Catrgory filter */}

            <div 
            className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter?'':'hidden'} sm:block`}>
               <p className='mb-3 text-sm font-medium'>TYPE</p>
               <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                     <input onChange={toggleSubCategory} className='w-3'  type="checkbox" value={'Topwear'} />Topwear
                    </p>

                    <p className='flex gap-2'>
                     <input onChange={toggleSubCategory} className='w-3'  type="checkbox" value={"Bottomwear"} />Bottomwear
                    </p>

                    <p className='flex gap-2'>
                     <input onChange={toggleSubCategory} className='w-3'  type="checkbox" value={"Winterwear"} />Winterwear
                    </p>
               </div>
            </div>

        </div>


        {/* Right side  */}


        <div className='flex-1'>
              
              <div className='flex justify-between text-base sm:text-2xl mb-4'>
                 <Title text1={'ALL'} text2={'COLLECTIONS'}/>
                 {/* product sort */}
                 <select onChange={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                         <option value="relavant">Sort by Relavant</option>
                         <option value="low-high">Sort by Low-High</option>
                         <option value="high-low">Sort by High-Low</option>
                 </select>
              </div>

            {/* map products */}

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    filterproducts.map((items,index)=>(
                        <ProductItem
                            key={index}
                            name={items.name}
                            image={items.image}
                            price={items.price}
                            id={items._id}
                        />
                    ))
                }
            </div>

        </div>

    </div>
  )
}

export default Collection