import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets.js'

const Sidebar = () => {
  return (
    // Sets the width of the sidebar to 18% of the parent/container width.
    <div className='w-[18%] min-h-screen border-r-1'> 
       <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

          <NavLink to="/add" className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 ${
            isActive ? 'bg-primary/10 border-r-4 border-primary' : ''
          }`}>
             <img className='w-5 h-5' src={assets.add_icon} alt="" />
             <p className='hidden md:block'> Add Items</p> 
          </NavLink>

          <NavLink to="/list" className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 ${
            isActive ? 'bg-primary/10 border-r-4 border-primary' : ''
          }`} >
             <img className='w-5 h-5' src={assets.order_icon} alt="" />
             <p className='hidden md:block'> List Items</p> 
          </NavLink>
 
          <NavLink to="/order" className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 ${
            isActive ? 'bg-primary/10 border-r-4 border-primary' : ''
          }`} >
             <img className='w-5 h-5' src={assets.order_icon} alt="" />
             <p className='hidden md:block'> Orders</p> 
          </NavLink>

       </div>
    </div>
  )
}

export default Sidebar