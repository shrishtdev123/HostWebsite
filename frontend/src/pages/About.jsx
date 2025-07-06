import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewletterBox from '../components/NewletterBox'
import AboutCompany from '../components/AboutCompany'

const About = () => {


  return (
    <div>
       <div className='text-2xl text-center pt-8 border-t'>
           <Title
               text1={'ABOUT'}
               text2={'US'}
           />
       </div>

       <div className="my-10 flex flex-col md:flex-row items-center gap-16 px-4">
  <img
    src={assets.about_img}
    alt="About AMBA HOMES"
    className="w-full max-w-[450px] object-cover rounded-lg shadow-md"
  />

  {/* About text section */}
  <AboutCompany />
</div>


       <div className='text-xl  py-4'>
            <Title
               text1={'WHY'}
               text2={'CHOOSE US'}
            />
       </div>

       <div className='flex flex-col md:flex-row text-sm mb-20 '>
   
              <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assurance:</b>
                <p className='text-gay-600'>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, debitis ducimus atque laborum eius recusandae ipsum
                </p>
              </div>


              <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convenience:</b>
                <p className='text-gay-600'>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, debitis ducimus atque laborum eius recusandae ipsum
                </p>
              </div>


              <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Exceptional Customer Service:</b>
                <p className='text-gay-600'>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, debitis ducimus atque laborum eius recusandae ipsum
                </p>
              </div>
       </div>

       <NewletterBox/>
    </div>
  )
}

export default About