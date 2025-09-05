// Import necessary React and third-party modules
import React, { useState ,useRef , useEffect } from 'react'
import { assets } from '../assets/admin_assets/assets.js' // Asset references (images, etc.)
import axios from 'axios' // For making HTTP requests
import { backendUrl } from '../App' // Backend API URL
import { toast } from 'react-toastify' // For showing user notifications
import Quill from 'quill'; // quill is for description box
// Add at the top of your file
import 'quill/dist/quill.snow.css'
import {parse} from 'marked'

// Add component: lets admin add a product
const Add = ({token}) => {

   const [isAdding , setIsAdding] = useState(false) // adding button
  const [loading , setLoading] = useState(false) // loading

  // quill box ka lia
   const editorRef = useRef(null)
   const quillRef = useRef(null)

   // States to manage four uploadable images
   const [image1,setImage1] = useState(false)
   const [image2,setImage2] = useState(false)
   const [image3,setImage3] = useState(false)
   const [image4,setImage4] = useState(false)

   // States to manage product details
   const [name,setName] = useState(''); // Product name
   const [description , setDescription] = useState(""); // Product description
   const [price , setPrice] = useState(""); // Product price
   const [category , setCategory] = useState("Health"); // Product category - UPDATED default
   const [bestseller , setBestseller ] = useState(false); // Bestseller flag
   const [sizes , setSizes] = useState([]); // Product sizes as an array

   // Handler for form submission
   const onSubmitHandler = async(e)=>{
    e.preventDefault(); // Prevent page reload on form submit
      setIsAdding(true)
    // Get article content from Quill editor
    const articleContent = quillRef.current ? quillRef.current.root.innerHTML : '';

    try {
      const formData = new FormData();
      // Append all product fields to formData object
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("article",articleContent) // NEW: Added article from Quill
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      // Include images only if uploaded
      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)
      
      // Send POST request to backend API with formData
      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        {headers:{token}}
      )

      if (response.data.success) {
        // If product is added successfully:
        toast.success(response.data.message) // Show success message
        // Reset all fields to initial state
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setBestseller(false)
        setPrice('')
        setSizes([])
        // Reset Quill editor content
        quillRef.current.root.innerHTML=''
      } else {
        // Show error returned from backend
        toast.error(response.data.message)
      }
    } catch (error) {
      // Handle errors (e.g., network or backend issues)
      console.log(error);
      toast.error(error.message)
    } finally{
        setIsAdding(false)
    }
   }

   const generateContent = async ()=>{
      if(!name) return toast.error('Please enter a title')
      try {
      setLoading(true);
      const { data } = await axios.post(backendUrl+'/api/product/generate', { prompt: name } , {headers:{token}})
      if(data.success){
        console.log("success")
      quillRef.current.root.innerHTML = parse(data.content)
      }else{
      toast.error(data.message)
      }
      } catch (error) {
      toast.error(error.message)
      }finally{
      setLoading(false)
      }
    }

    useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
        quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
    }, [])

  // Component render: form for adding product
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/* Image upload section */}
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {/* Upload button for each image */}
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>

      {/* Product name input */}
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className=' w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' type="text" placeholder='Type here' required/>
      </div>

      {/* Product description input */}
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' type="text" placeholder='Write content here' required/>
      </div>
       
       <p className='mt-4'>Article</p>
            <div className='w-full max-w-lg  h-74 pb-16 sm:pb-10 sm:max-w-lg pt-2 relative'>
              <div ref={editorRef}></div> {/* imp - using function quill  */}
              
               { loading && (
                <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
                    <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
                </div>
               ) }

               <button onClick={generateContent} disabled={loading} type='button'  className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
            </div>
            
      {/* Category and price - REMOVED subcategory section */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e)=>setCategory(e.target.value)}  className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
            <option value="Health">Health</option>
            <option value="Tech">Tech</option>
            <option value="Science">Science</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price}  className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded sm:w-[120px]' type="Number" placeholder='100' />
        </div>
      </div>

      {/* Size selection */}
      <div>
        <p className='mb-2'>Products Sizes</p>
        <div className='flex gap-3'>
          
          <div onClick={()=>setSizes(prev => prev.includes("5") ? prev.filter(item =>item!== "5") : [...prev,"5"])}>
            <p className={`${sizes.includes("5") ? "bg-blue-300" : "bg-white"} border  border-gray-300 outline-none rounded px-3 py-1 cursor-pointer`}>5</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("10") ? prev.filter(item =>item!== "10") : [...prev,"10"])}>
            <p className={`${sizes.includes("10") ? "bg-blue-300" : "bg-white"} border border-gray-300 outline-none rounded px-3 py-1 cursor-pointer`}>10</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("15") ? prev.filter(item =>item!== "15") : [...prev,"15"])}>
            <p className={`${sizes.includes("15") ? "bg-blue-300" : "bg-white"} border border-gray-300 outline-none rounded px-3 py-1 cursor-pointer`}>15</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("20") ? prev.filter(item =>item!== "20") : [...prev,"20"])}>
            <p className={`${sizes.includes("20") ? "bg-blue-300" : "bg-white"} border border-gray-300 outline-none rounded px-3 py-1 cursor-pointer`}>20</p>
          </div>
        </div>
      </div>
      
      {/* Bestseller checkbox */}
      <div className='flex gap-2 mt-2' >
        <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      {/* Submit button */}
      <button disabled={isAdding} type="submit" className=' w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>{isAdding ? 'Adding...':'Add'}</button>
    </form>
  )
}

export default Add
