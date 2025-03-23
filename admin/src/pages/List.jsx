import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendurl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

    const [list,setList]=useState([]);

    const fetchList=async()=>{

        try {

           const response=await axios.get(backendurl + '/api/product/list');

            if(response?.data?.sucess)
            {
              setList(response?.data?.product);
            }
            else
            {
               toast.error("some thing went wrong")
            }
           
           
           
          
        } catch (error) {
             console.log(error);
             toast.error("some thing went wrong")
             
        }
    }

    const removeproduct=async(id)=>{
    
          try 
          {
              const response=await axios.post(backendurl + '/api/product/remove',{id},{
                 headers:{
                      token
                 }
              })

              if(response.data.sucess){
                  toast.success(response.data.message);
                   await fetchList();
              }
              else
              {
                toast.error("error")
              }
               
          } 
          catch (error) 
          {
             console.log(error);
             toast.error("error123")
             
          }
          
    }

    useEffect(()=>{
        fetchList();
    },[])
  return (
    <>
     <p className='mb-2'>ALL Product List</p>
     <div className='flex flex-col gap-2'>
      {/* List table title */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1  px-2 border bg-gray-100 text-sm'>
         <b>Image</b>
         <b>Name</b>
         <b>Category</b>
         <b>Price</b>
         <b className='text-center'>Action</b>
      </div>

       {/* -----Product List  */}
       {
          list.map((item,index)=>(
        <div className='grid grid-cols-[1fr_3fr_1fr]
                  md:grid-cols-[1fr_3fr_1fr_1fr_1fr]
         items-center gap-2 py-1 px-2 border text-sm' key={index}>
                
                  <img className='w-12' src={item.image[0]} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{currency}{item.price}</p>
                  <p
                    onClick={()=>removeproduct(item._id)}
                   className='text-right md:text-center cursor-pointer text-lg'>X</p>
              </div>
          ))
       }
     </div>
      
    </>
  )
}

export default List