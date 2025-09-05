import { assets } from '../assets/admin_assets/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'
import {backendUrl, currency} from '../App'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null
    }

    try {

      const response = await axios.post(backendUrl+'/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        console.log(response)
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(response.data.message)
    }

  }

  // in these function what we select is event go to select tag and see on change function 
  const statusHandler = async(event , orderId)=>{
          try {
            const response = await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
            if (response.data.success) {
              await fetchAllOrders()
            }
          } catch (error) {
            // console.log(error);
            toast.error(error.message)
            
          }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <div>
        {
          // it will give single orders from orders model
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {/*it will go to orders ka items ka array mai  */}
                  {order.items.map((item, index) => {
                    // user add 1 product only then so then in diffesrent type 
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span> pagesize: {item.size} </span></p>
                    }
                    else {
                      // user add more than 1 product product only then so then in diffesrent type
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>pagesize: {item.size} </span> , </p>
                    }
                  })}
                </div>
                <p className=' mb-2 font-medium'>{order.address.firstname + " " + order.address.lastname}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select value={order.status} onChange={(event)=>statusHandler(event,order._id)}  className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )

}

export default Orders