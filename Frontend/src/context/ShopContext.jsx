import { createContext,useState,useEffect,useContext } from "react";
// import { products } from "../assets/frontend_assets/assets.js";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const [products, setProducts] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currency = '₹';
    const delivery_fee = 10;
    const [cartItems, setCartItems] = useState({});
    const [input, setInput] = useState("");
    const [ token , setToken ] = useState('') // for storing user token

    // itemId is productId
      const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }
        const cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            //Check if the selected size already exists.
            //If yes, increment the quantity by 1.
            // If not, initialize that size with quantity 1.
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 }; //If the product is not in the cart at all : Add the product with the selected size and set quantity to 1.
        }
        // console.log(cartData)
        setCartItems(cartData);
         toast.success('Added to Cart');

        if(token){
          try {
              await axios.post(backendUrl+'/api/cart/add',{itemId , size} , {headers:{token}})
              
          } catch (error) {
              console.log(error)
              toast.error(error.message)
              
          }
        }
    };

    
    const navigate = useNavigate(); 

    // uses in navbar to count the items added to  card total
    const getCartCount = () =>{
      let totalCount = 0;
      for(const items in cartItems){
          for(const item in cartItems[items]){
              try {
                  if (cartItems[items][item] > 0) {
                      totalCount += cartItems[items][item];
                  }
              } catch (error) {
                  
              }
          }
      }
      return totalCount;
    }


    const updateQuantity = async (itemId,size,quantity) => {
            let cartData = structuredClone(cartItems);
    
            cartData[itemId][size] = quantity;
    
            setCartItems(cartData);

            
             if (token) {
              try {
                  await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
              } catch (error) {
                  console.log(error);
                  toast.error(error.message)
              }
            }   
    }

    const getCartAmount =() => {
     let totalAmount = 0;
    for(const items in cartItems){
        let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items])
            {
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]; // product price * quantity
                    }
                } catch (error) {
                    
                }
            }
    }
    return totalAmount;
    }

     const getProductsData = async()=>{
    try {
        
       const response = await axios.get( backendUrl+'/api/product/list')
        // console.log(response.data);
         
       if(response.data.success){
        setProducts(response.data.products)
       }else{
        toast.error(response.data.message)
       }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
  }

   const getUserCart= async(token)=>{
    try {
        const response = await axios.post( backendUrl+'/api/cart/get',{},{headers:{token}})
        if (response.data.success) {
            setCartItems(response.data.cartData)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  }

  useEffect(() => {
       getProductsData()
    },[])


    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
              getUserCart(localStorage.getItem('token')) //
        }
  },[])

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    input,
    setInput,
    backendUrl,
    token,
    setToken
  };

  return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export const useShopContext = () => {
    return useContext(ShopContext);
};

export default ShopContextProvider;