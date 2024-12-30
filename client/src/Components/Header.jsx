import React from 'react'
import LOGO from '../assets/logo.png'

function Header() {
  return (
    <div className='bg-white h-14 rounded-b-md shadow-lg' >
            <div  className='mx-10 flex justify-between items-center'>
                <img src={LOGO} alt="LOGO" width="50px" height="50px"  
                className='rounded-full'/>
                 <div>
                 <button className='bg-red-500 hover:bg-red-700 p-1.5 rounded-lg text-white font-semibold'>Log Out</button>
                 </div>
                
            </div>
    </div>
    
  )
}

export default Header