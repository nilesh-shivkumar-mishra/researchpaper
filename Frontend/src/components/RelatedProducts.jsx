import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subCategory}) => {


    const {products} = useContext(ShopContext);
    const [ related,setRelated] = useState([]);

    useEffect(()=>{
      
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy=productsCopy.filter((item)=>category === item.category);
            productsCopy=productsCopy.filter((item)=>subCategory === item.subCategory);

            setRelated(productsCopy.slice(0,5));
        }
    },[products])


  return (
    <div className='my-12'>
      <div className=" mb-8 justify-center w-40 m-auto items-center  px-6 py-1.5  border border-primary/40 bg-primary/10 rounded-full text-sm text-primary ">
        <p>Related Products</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {related.map((item,index)=>(
            <ProductItem  key={index}
            id={item._id}
            category={item.category}
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
             />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts