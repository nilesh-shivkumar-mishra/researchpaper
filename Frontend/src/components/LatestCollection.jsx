// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

     useEffect(()=>{
            // return 10 items from product
            setLatestProducts(products.slice(0,8)); 

    },[products])

  return (
    <div className="my-10">
      <div className=" mb-8 justify-center w-49 m-auto items-center  px-6 py-1.5  border border-primary/40 bg-primary/10 rounded-full text-sm text-primary ">
        <p>Latest research papers</p>
      </div>
      {/* Rendering Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            category={item.category}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;