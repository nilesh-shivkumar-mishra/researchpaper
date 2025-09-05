// eslint-disable-next-line no-unused-vars
import React, { useState,useContext ,useEffect } from "react";
import { ShopContext } from '../context/ShopContext'
import { toast } from "react-toastify";
import axios from 'axios'

const Login = () => {
 const [currentState, setCurrentState] = useState("Sign Up");
 const{token , setToken , navigate ,backendUrl} = useContext(ShopContext)
 const [ name , setName] =useState('')
  const [ email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    try {
      if (currentState==='Sign Up') {
             
        const response = await axios.post(backendUrl+'/api/user/register',{name,email,password})
        // console.log(response.data)
        if (response.data.success) {
          setToken(response.data.token)
          toast.success("Welcome to ResearchHub")
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }else{
          const response = await axios.post(backendUrl+'/api/user/login',{email,password})
          if (response.data.success) {
            toast.success("Welcome Back")
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }else{
            toast.error(response.data.message)
          }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
   }

   useEffect(()=>{
        if(token){
          navigate('/')
        }
   },[token])



  return (
     <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 md:m-6 border border-primary/30
        shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">

          <div className="w-full  text-center">
            <h1 className="text-3xl font-bold text-primary">{currentState}</h1>
          </div>

          <form  onSubmit={onSubmitHandler} className="mt-4 w-full sm:max-w-md
            text-gray-600">
              {currentState === "Login" ? (
        ""
      ) :(
            <div className="flex flex-col">
              <label>Name</label>
              <input 

                type="text" required placeholder="your name" value={name}  onChange={(e)=>setName(e.target.value)}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"/>
            </div>
      )}
            <div className="flex flex-col">
              <label>Email</label>
              <input 
                type="email" required placeholder="your email id" value={email} onChange={(e)=>setEmail(e.target.value)}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"/>
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input  type="password" required placeholder="your password" value={password}  onChange={(e)=>setPassword(e.target.value)}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"/>
            </div>

            <div className="w-full my-3 flex justify-between text-sm mt-[-8px]">
               <p className="cursor-pointer">Forgot Your Password?</p>
               
               {currentState === "Login" ? (
                 <p
                   onClick={() => setCurrentState("Sign Up")}
                   className="cursor-pointer"
                 >
                   Create Account
                 </p>
               ) : (
                 <p
                   onClick={() => setCurrentState("Login")}
                   className="cursor-pointer"
                 >
                   Login Here
                 </p>
               )}
            </div>

            <button type="submit" className="w-full py-3 mt-3 font-medium bg-primary
              text-white rounded cursor-pointer hover:bg-primary/90
              transition-all"> {currentState === "Login" ? "Log In" : " Sign Up"}{" "}
            </button>

          </form>
  
        </div>
      </div>
    </div>
  );
};

export default Login;