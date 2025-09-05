import React, { useEffect ,useContext } from 'react'
import { ShopContext } from "../context/ShopContext";
import { useLocation } from 'react-router-dom'

const Loading = () => {

    const { navigate } = useContext(ShopContext)
    let { search } = useLocation()
    const query = new URLSearchParams(search)
    const nextURL = query.get('next')

    useEffect(() => {
       if(nextURL){
        setTimeout(() => {
            navigate(`/${nextURL}`)
        }, 5000)
       }
    }, [nextURL])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary'></div>
    </div>
  )
}

export default Loading