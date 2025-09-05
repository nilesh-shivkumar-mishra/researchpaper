import {React , useContext} from "react";
import {Categories } from "../assets/frontend_assets/assets.js";
import { useState } from "react";
import { motion } from "motion/react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem.jsx";

const CategoryList = () => {

  const { products , input } = useContext(ShopContext);

  const [menu, setMenu] = useState("All");
  //serch functionality
  const filteredBlogs = () => {
//   if (!products) return [];
  if (input === '') {
    return products;
  }
  return products.filter((products) =>
    products.name.toLowerCase().includes(input.toLowerCase()) ||
    products.category.toLowerCase().includes(input.toLowerCase())
  );
};

  return (
    <div>
      <div className="flex justify-center gap-3 sm:gap-8 my-10 relative">
        {Categories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      {/* blog card */}
       {/*Filter blogs: If menu === "All" → return all blogs (true) Else → only return blogs where blog.category === menu (in simple words : how all blogs if "All" is selected, otherwise show blogs that match the selected category)  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
        {filteredBlogs().filter((products) => (menu === "All" ? true : products.category === menu)).map((products) => (
            <ProductItem 
            key={products._id}
            id={products._id}
            image={products.image}
            name={products.name}
            category={products.category}
            description={products.description}
            price={products.price}
             />
            
          ))}
      </div>
    </div>
  );
};

export default CategoryList;