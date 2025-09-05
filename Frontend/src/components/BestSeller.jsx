// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 4));
  }, [ products]);

  return (
    <div className="my-10">
     <div className=" mb-8 justify-center w-27 m-auto items-center  px-6 py-1.5  border border-primary/40 bg-primary/10 rounded-full text-sm text-primary ">
        <p>BestSeller</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
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
  );
};

export default BestSeller;