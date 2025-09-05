import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";

const Cart = () => {
  const { products, currency, cartItems , updateQuantity  , navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      const sizes = cartItems[productId];
      for (const size in sizes) {
        if (sizes[size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: sizes[size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);
  
  return (
    <div className="border-t relative pt-14">
        <img
            src={assets.gradientBackground}
            alt=""
            className="absolute -top-50 -z-1 opacity-50"
          />
        <h1 className="text-2xl sm:text-3xl font-semibold sm:leading-16 text-gray-700">Your <span className="text-primary">Cart</span>.</h1>
       <div>

        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid gird-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}{" "}
                    </p>

                   <p className="ox-2 sm:px-3 sm:py-1 border bg-slate-100"> 
                     Size :{item.size}
                   </p>
                    
                  </div>
                </div>
              </div>

              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value) // converting string to Numbaer
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1-"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=" delet iconS"
              />
            </div>
          );
        })} 

      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>

          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-primary text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;