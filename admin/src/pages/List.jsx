import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

// Component to list and remove products
const List = ({token}) => {

  // State to store products list
  const [list, setList] = useState([])

  // Function to fetch products from API
  const fetchList = async () => {
    try {
      // Make a GET request to fetch product list
      const response = await axios.get(backendUrl+'/api/product/list')
      if (response.data.success) {
        // If successful, update the list state with products
        setList(response.data.products)
      }
      else {
        // Display error from API if not successful
        toast.error(response.data.message)
      }
    } catch (error) {
      // Handle any network/server errors
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to remove a product by its ID
  const removeProduct = async (id) => {
    try {
      // Make a POST request to remove the product
      const response = await axios.post(
        backendUrl+'/api/product/remove', 
        { id }, 
        { headers: {token} }
      )
      if (response.data.success) {
        // If successful, show a success message and refresh the product list
        toast.success(response.data.message)
        await fetchList()
      } else {
        // Show error message if unsuccessful
        toast.error(response.data.message)
      }
    } catch (error) {
      // Handle errors during remove process
      console.log(error)
      toast.error(error.message)
    }
  }

  // Fetch the product list when the component mounts (on first render)
  useEffect(() => {
    fetchList()
     
  }, [])

  return (
    <>
      {/* Title */}
      <p className='mb-2'>All Products List</p>
      
      {/* Product List Table */}
      <div className='flex flex-col gap-2'>

        {/* Table headers for desktop screens */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {
          // Loop through each product and render its details
          list.map((item, index) => (
            <div 
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              {/* Product Image */}
              <img className='w-12' src={item.image[0]} alt="" />

              {/* Product Name */}
              <p>{item.name}</p>

              {/* Product Category */}
              <p>{item.category}</p>

              {/* Product Price */}
              <p>{currency}{item.price}</p>

              {/* 'X' to remove product (calls removeProduct when clicked) */}
              <p 
                onClick={()=>removeProduct(item._id)} 
                className='text-right md:text-center cursor-pointer text-lg'
                title="Remove product"
              >X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List