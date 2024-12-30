import React from 'react'
import { FaSlidersH } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoAttach, IoVideocam } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdAttach } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";

function Hero() {
  return (
    <div className=' h-[93vh] flex rounded-lg shadow-lg'>

      {/* navbar */}
       <div className='bg-gradient-to-b from-blue-500 to-blue-800 w-11 rounded-sm shadow-2xl flex flex-col items-center'>
            <FaSlidersH className='text-white mt-3'/>
       </div>

      {/* leftside */}
      <div className='w-[30vw] bg-blackshade  rounded-r-lg shadow-lg text-white h-full '>
            <div className=' flex flex-col gap-2 h-14 w-full bg-gray-900 p-3 rounded-md shadow-lg'>
            <h1 className='text-2xl font-bold'>Chats</h1>
            </div>

            <div className='m-2 relative'>
            <input type="text" placeholder='Search or start a new chat' className='p-2 w-full border-b-4 focus:outline-none bg-slate-200 text-slate-600 ' />
            <CiSearch className='absolute text-2xl text-slate-500 right-2 top-3'/>
            </div>
      </div>

       {/* right side */}
       <div className='bg-slate-200 w-[70vw] flex flex-col justify-between'>
             <div className='h-14 w-full bg-slate-300 rounded-sm shadow-sm flex items-center justify-between p-7 '>
                       <div>
                        <FaRegCircleUser className='text-4xl'/>
                       </div>
                       <div className='flex items-center justify-between gap-5 text-xl'>
                            <IoVideocam className='text-gray-600 hover:text-gray-900 cursor-pointer'/>
                            <IoMdCall className='text-gray-600 cursor-pointer hover:text-gray-900'/>
                            <HiDotsVertical className=' cursor-pointer text-gray-600 hover:text-gray-900'/>
                       </div>
             </div>

              {/* chat section */}
              <div className='h-[75vh]'>
                      chat
                 </div>

                 {/* contollers */}
                 <div className='h-16 bg-white flex items-center justify-between px-11 '>
                     <span className='flex gap-7 text-3xl'>
                     <IoAttach className='text-pink-500'/>
                     <MdEmojiEmotions className='text-yellow-300  border  rounded-full '/>
                     </span>
                     <input type="text" placeholder='type a message'  className='focus:outline-none border w-full mx-5 p-2'/>
                     <IoSend className='text-3xl text-blue-500'/>
                 </div>
    
       </div>
                
    </div>
  )
}

export default Hero