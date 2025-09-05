import {React , useContext} from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from "../context/ShopContext";

const Contact = () => {
   const { navigate} = useContext(ShopContext);


  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      {/* Decorative background */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />

      {/* ---------- Header ---------- */}
      <header className="text-center mt-10 mb-16 relative ">
         <h1 className="text-3xl mb-7 sm:text-5xl font-semibold sm:leading-16 text-gray-700">Contact <span className="text-primary"> Us </span></h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get in touch with our research team&mdash;we&rsquo;re here to help.
        </p>
      </header>

      <main className="max-w-6xl mx-auto relative">
        {/* ---------- Contact-method cards ---------- */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Email */}
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us your queries anytime</p>
            <p
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              example@gmail.com
            </p>
          </div>

          {/* Phone */}
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Call us for immediate assistance</p>
            <p
              className="text-green-600 font-semibold hover:text-green-700"
            >
              +1&nbsp;(91)&nbsp;12121312125
            </p>
          </div>

          {/* Address */}
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Our Office</h3>
            <p className="text-gray-600 mb-4">Come meet our team in person</p>
            <p className="text-purple-600 font-semibold leading-relaxed">
              Address Here
            </p>
          </div>
        </section>

        {/* ---------- Business Hours ---------- */}
        <section className="flex justify-center mb-20">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Business Hours</h3>

            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Monday&nbsp;–&nbsp;Friday:</span>
                <span className="font-semibold">9:00&nbsp;AM&nbsp;–&nbsp;6:00&nbsp;PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold">10:00&nbsp;AM&nbsp;–&nbsp;4:00&nbsp;PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold">Closed</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">All times are&nbsp;EST</p>
          </div>
        </section>

        {/* ---------- Call-to-action ---------- */}
        <section className="text-center mb-24">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Ready to Start Your Research Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Don&rsquo;t wait—explore our extensive collection of research papers and
            order your physical copies today.
          </p>
          <button 
            onClick={() => navigate('/collection')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Research Papers
          </button>
        </section>
      </main>
    </div>
  );
};

export default Contact;
