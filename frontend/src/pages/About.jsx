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

       <div className='my-10 flex flex-col md:flex-row gap-16'>
         <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="" />

         {/* <div className='flex flex-col  justify-center gap-6 md:w-2/4 text-gray-600'>
             <p>
             STARINNIGS OVERSES PRIVATE LIMITED is a new and exciting presence in the clothing industry, which is often characterized by fast-changing trends. Though we are a new entrant, our brand identity is built on a foundation of passion, creativity, and a commitment to high-quality fashion that stands the test of time.
             </p>
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia consequatur itaque autem. Ratione dolorum, sed corporis perferendis maxime beatae et, eligendi iusto, asperiores earum vitae accusamus sit inventore similique doloribus.</p>

             <b className='text-gray-800'>Our Mission</b>
             <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo hic ipsa optio odio possimus ipsam dicta incidunt saepe facere reprehenderit dolor corrupti tempora, expedita quam cupiditate pariatur assumenda labore aut!
             </p>
         </div> */}

           <AboutCompany/>
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