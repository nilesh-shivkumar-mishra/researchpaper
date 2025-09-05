
import React, {  useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'
import { toast } from 'react-toastify'

const Navbar = () => {
    const{getCartCount,setCartItems ,setToken ,token, navigate} = useContext(ShopContext)
    const [visible, setVisible] = useState(false);

    const logouthandler =() =>{
        setToken("")
        navigate('/login')
        localStorage.removeItem('token')
        setCartItems({})
        toast.success("Logout successfully")
    }
    
    return (
        <div className='flex x items-center justify-between py-3 font-medium '>
           
           <Link to='/'><p className='text-2xl '>ResearchHub</p></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>

               <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-primary hidden ' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-primary hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-primary hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-primary hidden ' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
               <div className="relative group">
                 {/* Profile Icon */}
                 <img
                   onClick={() => token ? null : navigate('/login')}
                   src={assets.profile_icon}
                   className="w-5 cursor-pointer"
                   alt=""
                 />
               
                 {/* Dropdown Menu (only if logged in) */}
                 {token && (
                   <div className="absolute right-0 pt-4 hidden group-hover:flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 z-50">
                     <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                     <p onClick={logouthandler} className="cursor-pointer hover:text-black">Logout</p>
                   </div>
                 )}
               </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart icon" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='cursor-pointer w-5 sm:hidden' alt="" />
            </div>

            {/* Sidebar Menu For Small Screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white z-4 transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>

                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 ' to='/'>
                        HOME
                    </NavLink>
                    <NavLink  onClick={()=>setVisible(false)} className='py-2 pl-6 ' to='/collection'>
                        COLLECTION
                    </NavLink>
                    <NavLink  onClick={()=>setVisible(false)} className='py-2 pl-6 ' to='/about'>
                        ABOUT
                    </NavLink>
                    <NavLink  onClick={()=>setVisible(false)} className='py-2 pl-6 ' to='/contact'>
                        CONTACT
                    </NavLink>

                    <img
                       src={assets.gradientBackground}
                       alt=""
                       className="absolute -top-50 -z-1 opacity-50"
                     />

                </div>
            </div>
        </div>
    )
}

export default Navbar