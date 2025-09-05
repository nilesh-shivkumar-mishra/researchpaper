// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'

import { assets } from '../assets/frontend_assets/assets.js'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const [method, setMethod] = useState('cod');

   const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    backendUrl
  } = useContext(ShopContext);

  
    const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const OnChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name]: value }))
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    // it finding the card product in all product and add sixe and quantity value
    // step 1 finds peoduct then add 2 more size selected sixe and quantity seleted quantity
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find(product => product._id === items)
            )
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
              // console.log(itemInfo)
            }
          }
        }
      }

     

        let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }


      switch (method) {
        case "cod":
      
          const response = await axios.post(  backendUrl+"/api/order/place", orderData,{headers:{token}});
          // console.log(response.data)
          if (response.data.success) {
            
            setCartItems({});
            navigate("/orders")
            // <button onClick={() => navigate("/order")}>Test Navigation</button>
          } else {
            toast.error(response.data.message)
          }
          break;

          case 'stripe':
           const responseStripe = await axios.post(backendUrl+"/api/order/stripe",orderData,{headers:{token}})
           if (responseStripe.data.success){
             const{session_url} =responseStripe.data
             window.location.replace(session_url)

           }else{
             toast.error(responseStripe.data.message)
           }
           break;
      }

    }catch(error){
      console.log(error);
    }

  }
  


  return (
    <form
      onSubmit={onSubmitHandler}
      className=" relative flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >

            <img
            src={assets.gradientBackground}
            alt=""
            className="absolute -top-50 -z-1 opacity-50"
          />
      
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        {/*left side */}
         <h1 className="text-2xl sm:text-3xl font-semibold sm:leading-16 text-gray-700">DILIVERY <span className="text-primary">INFORMATION</span>.</h1>
        <div className="flex gap-3">
          <input
            required
            onChange={OnChangeHandler}
            name="firstname"
            value={formData.firstname}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
          />
          <input
            required
            onChange={OnChangeHandler}
            name="lastname"
            value={formData.lastname}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={OnChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email address"
        />
        <input
          required
          onChange={OnChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={OnChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            required
            onChange={OnChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={OnChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={OnChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={OnChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
        />
      </div>

      {/*right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <div>PAYMENT METHOD</div>
          <div className="flex gap-3 flex-col lg:flex-row">

            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : " "
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
 
            {/*we not include  */}
            {/* <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : " "
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div> */}

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : " "
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4f">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button //onClick={()=>navigate('/order')}
              type="submit"
              className="bg-primary text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder