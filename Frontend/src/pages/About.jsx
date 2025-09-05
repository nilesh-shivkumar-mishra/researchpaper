import {React , useContext} from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from "../context/ShopContext";
const About = () => {
      const { navigate} = useContext(ShopContext);
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
  <div className="text-center mt-10 mb-8">
    <img
      src={assets.gradientBackground}
      alt=""
      className="absolute -top-50 -z-1 opacity-50"
    />
    
    {/* About Section */}
    <div className="relative">
        <h1 className="text-3xl mb-7 sm:text-5xl font-semibold sm:leading-16 text-gray-700">About <span className="text-primary"> Our </span> Research<br/> Hub </h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        Your gateway to cutting-edge research and academic excellence
      </p>
    </div>
  </div>

  {/* Main Content */}
  <div className="max-w-6xl mx-auto">
    {/* Mission Statement */}
    <div className="text-center mb-16">
      <h2 className="text-3xl font-semibold text-primary mb-6">Our Mission</h2>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
        We bridge the gap between groundbreaking research and accessible knowledge. 
        Our platform provides researchers, students, and academics with instant access 
        to high-quality research papers while offering the option to own physical copies 
        of the work that matters most to them.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 gap-12 mb-16">
      {/* Digital Access */}
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Digital Library</h3>
        <p className="text-gray-600 leading-relaxed">
          Access thousands of research papers instantly. Read, search, and bookmark 
          papers across multiple disciplines with our user-friendly digital platform.
        </p>
      </div>

      {/* Physical Copies */}
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Physical Copies</h3>
        <p className="text-gray-600 leading-relaxed">
          Order high-quality printed versions of any research paper. Perfect for 
          in-depth study, presentations, or building your personal research library.
        </p>
      </div>
    </div>

    {/* Why Choose Us */}
    <div className="bg-gray-50 rounded-lg p-8 mb-16">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        Why Choose Our Platform?
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="text-center">
          <h4 className="font-bold text-gray-800 mb-2">✓ Curated Content</h4>
          <p className="text-gray-600">Hand-picked, peer-reviewed research papers</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-gray-800 mb-2">✓ Fast Delivery</h4>
          <p className="text-gray-600">Quick shipping for physical copies worldwide</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-gray-800 mb-2">✓ Multiple Formats</h4>
          <p className="text-gray-600">Digital PDF and premium print options</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-gray-800 mb-2">✓ Advanced Search</h4>
          <p className="text-gray-600">Find papers by topic, author, or keywords</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-gray-800 mb-2">✓ Affordable Pricing</h4>
          <p className="text-gray-600">Competitive rates for premium content</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-gray-800 mb-2">✓ 24/7 Support</h4>
          <p className="text-gray-600">Always here to help with your research needs</p>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="text-center mb-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Ready to Explore?
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Join thousands of researchers and students who trust our platform for 
        their academic and research needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <button 
    onClick={() => navigate('/collection')}
    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
  >
    Browse Research Papers
  </button>
</div>
    </div>
  </div>
</div>

  )
}

export default About