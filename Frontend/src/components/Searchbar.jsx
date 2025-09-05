import {React,useContext} from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { useRef } from "react";
import { ShopContext } from "../context/ShopContext";

const Searchbar = () => {
   const { setInput, input  } = useContext(ShopContext);
    const inputRef = useRef()

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        setInput(inputRef.current.value)
    }

    const onClear = ()=>{
        setInput('')
        inputRef.current.value = ''
    }


  return (
    <div className="mx-8 sm:mx-16 x1:mx-24 relative">
      <div className="text-center mt-8 mb-8">
        <h1 className="text-3xl sm:text-5xl font-semibold sm:leading-16 text-gray-700">Discover <span className="text-primary"> Top </span> Research Papers <br />by Category.</h1>
        <form onSubmit={onSubmitHandler} className="flex mt-10 justify-between max-w-lg sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
          <input ref = {inputRef} type="text" placeholder="Search By Title" required className="w-full pl-4 outline-none"/>
          <button type="submit" className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer">Search</button>
        </form>
      </div>

     { input && <div className="text-center">
        <button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer">Clear Search</button>
      </div>}


      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Searchbar;