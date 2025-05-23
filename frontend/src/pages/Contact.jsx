import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewletterBox from '../components/NewletterBox'

const Contact = () => {
  return (
    <div className='text-center text-2xl pt-10 border-t'>
           <Title
              text1={'CONTACT'}
              text2={'US'}
           />

         <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          
              <img className='w-full md:max-w-[480px]'  src={assets.contact_img} alt="" />

              <div className='flex flex-col justify-center items-start gap-6'>
                
                    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                    <p className='text-gray-500'>54709 Greate Noida <br /> UP,Noida</p>
                    <p className='text-gray-500'>Tel:(+91) 6306010835<br />Email:shrishtdev@gmail.com</p>
                    <p className='font-semibold text-xl text-gray-600'>Careers at forever</p>

                    <p className='text-gray-500'>Learn more about us </p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white'>Explore Jobs</button>
              </div>
         </div>

          <NewletterBox/>
    </div>
  )
}

export default Contact