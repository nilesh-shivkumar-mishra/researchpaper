import React from 'react'
import { assets } from '../assets/frontend_assets/assets.js'

const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 x1:mx-24 relative">
        <div className="text-center mt-10 mb-8">
            <h1 className="text-3xl sm:text-5xl font-semibold sm:leading-16 text-gray-700">Explore Latest <span className="text-primary">Research Paper</span> <br />Now.</h1>
            <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">Discover cutting-edge research online.Read anytime, anywhere with ease. <br />Order a physical copy to keep forever.</p>
        </div>
          <img
            src={assets.gradientBackground}
            alt=""
            className="absolute -top-50 -z-1 opacity-50"
          />
    </div>
  )
}

export default Header