import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = ({setToken}) => {
  return (
    <div className='flex border-b items-center py-2 px-[4%] justify-between'>
        <Link to='/'><p className='text-2xl '>ResearchHub</p></Link>
      <button onClick={()=>setToken('')}  className='bg-primary text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar