// Import the userModel from the models folder

import userModel from "../models/userModel.js"


// Add products to user cart
const addToCart = async (req, res) => {
  try {
    // Destructure product and user info from request body
    const { userId, itemId, size } = req.body // size and product id from frontend

    // Find the user data using userId
    const userData = await userModel.findById(userId)
    // Extract the cart data from user data
    let cartData = await userData.cartData

    // If the item is already in the cart
    if (cartData[itemId]) {
      // And if the particular size exists
      if (cartData[itemId][size]) {
        // Increment quantity by 1
        cartData[itemId][size] += 1
      } else {
        // Otherwise, set quantity to 1 for new size
        cartData[itemId][size] = 1
      }
    } else {
      // If item is not in cart, add it with current size and set quantity to 1
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    // Update user cart in the database
    await userModel.findByIdAndUpdate(userId, { cartData })

    // NOTE: Changed the message here as per your request
    res.json({ success: true, message: "Item Added To Cart" })

  } catch (error) {
    // Handle errors
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Update user cart (overwrite quantity)
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body // productId size and quantity
    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    // Update the cart with new quantity for a particular item and size
    cartData[itemId][size] = quantity

    await userModel.findByIdAndUpdate(userId, { cartData })

    res.json({ success: true, message: "Cart Updated" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body
    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    res.json({ success: true, cartData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
export{addToCart , updateCart , getUserCart} 