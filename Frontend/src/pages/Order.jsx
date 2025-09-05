import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import{ assets} from '../assets/frontend_assets/assets.js'
const Orders = () => {

  const {backendUrl,token , currency }=useContext(ShopContext);

  const [orderData , setorderData] = useState([])

  const loadOrderData = async()=>{
  
    try {
          
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl+'/api/order/userorders' , {} , {headers:{token}})
      
      if(response.data.success){
        const allOrdersItem = []
        // accessing single order or all orders(if you are not understanding please console.log)
        response.data.orders.map((order)=>{
          // accessing single order ka ander items section ko
           order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)
           })
        })
        // console.log(allOrdersItem);
        setorderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error)
      toast.error(response.message)
    }
  }

   useEffect(()=>{
     loadOrderData()
   },[token])

  return (
    <div className=' relativeborder-t pt-16'>

            <img
            src={assets.gradientBackground}
            alt=""
            className="absolute -top-50 -z-1 opacity-50"
          />
          
        <h1 className="text-2xl sm:text-3xl font-semibold sm:leading-16 text-gray-700">MY <span className="text-primary">ORDERS</span>.</h1>

       <div>
        {
          orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Size:{item.size}</p>
                  </div>
                  <p className='mt-1'>Date:<span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment:<span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                 <div className='flex items-center gap-2'>
                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                   <p className='text-sm md:text-base'>{item.status}</p>
                 </div>
                 <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
       </div>

    </div>
  )
}

export default Orders