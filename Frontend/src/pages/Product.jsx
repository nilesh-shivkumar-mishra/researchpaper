import React,{useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets.js';
import RelatedProducts from '../components/RelatedProducts';
import Moment from 'moment';


const Product = () => {

  const {productId} = useParams();
  const {products , currency ,navigate, addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async()=>{
        products.map((item)=>{
          if (item._id === productId) {
            setProductData(item)
            setImage(item.image[0])
            return null;
          }
        })
  }

  const handleBuyNow = () => {
    addToCart(productData._id, size);
    if(size){
      navigate('/cart');
    }
    
  };

   
  useEffect(()=>{
    fetchProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[productId , products])


  return productData ? (
    <>
     <div className="text-center mt-4 text-gray-600 relative ">
        <p className="text-primary py-4 font-medium">Published on {Moment(productData.date).format('MMMM DD YYYY')}</p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">{productData.name}</h1>
        <h2 className="my-5 max-w-lg truncate mx-auto" dangerouslySetInnerHTML={{__html : productData.description}}></h2> {/* it contain some strong tag */}
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">Nilesh Mishra</p>
         
         {/* background gradient image */}
         <img
            src={assets.gradientBackground}
            alt=""
            className="absolute -top-50 -z-1 opacity-50"
          />
          
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
       <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                {
                  productData.image.map((item,index)=>(
                    <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
                  ))
                }
            </div>
            <div className='w-full sm:w-[80%]'>
             <img className='w-full h-auto' src={image} alt="" />
            </div>
          </div>
         

       <div className="rich-text max-w-3xl mx-auto " dangerouslySetInnerHTML={{ __html: productData.article }}></div> {/*rich text class in index.css */}
      </div>

      {/* order pysical copy  */}

      <div className=' pt-10 transition-opacity ease-in duration-500 opacity-100'>
        
        <div className=" mb-8 justify-center w-74 m-auto items-center  px-6 py-1.5  border border-primary/40 bg-primary/10 rounded-full text-sm text-primary ">
        <p>Order Physical Copy With More Details</p>
      </div>

      {/* product data */}
       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
          
          {/* product imgs */}
          
            <div className='w-full sm:w-[80%]'>
             <img className='w-full h-auto' src={image} alt="" />
            </div>
         

          {/*product info */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex item-center gap-1 mt-2'>
                  <img className='w-5 5' src={assets.star_icon} alt="" />
                  <img className='w-5 5' src={assets.star_icon} alt="" />
                  <img className='w-5 5' src={assets.star_icon} alt="" />
                  <img className='w-5 5' src={assets.star_icon} alt="" />
                  <img className='w-5 5' src={assets.star_dull_icon} alt="" />
                  <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

            
            {/* size */}

            <div className='flex flex-col gap-4 my-8'>
                <p>Select Page Size</p> 
                 <div className="flex flex-wrap gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`px-5 py-2 border-2 rounded-xl font-medium transition-all duration-200 ${
                      item === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div> 
            <div className='flex gap-4'>
            <button onClick={handleBuyNow}  className='bg-primary w-50 text-white px-8 py-3 text-sm active:bg-gray-700'>BUY NOW</button>
            <button onClick={()=>addToCart(productData._id,size)} className=' w-50 bg-primary text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            </div>
            
            <div className="border-t my-5 border-gray-200 pt-6 space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Cash on delivery available</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
       </div>


      
       {/* display related products*/}
       <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

      </div>
    </>
   ) : <div className='opacity-0'>Loading..</div>

    
}

export default Product