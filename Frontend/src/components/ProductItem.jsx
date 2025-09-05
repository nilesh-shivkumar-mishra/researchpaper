// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price ,category,description}) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer ' to={`/product/${id}`}>
        <img src={image[0]} className='aspect-video' alt="" />
        <span className='ml-3 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
      <div className='p-3'>
      <h5 className='mb-2  text-gray-900'>{name}</h5>
       <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{ __html: description.slice(0, 80)}}></p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </div>
    </Link>
  );
};

export default ProductItem;