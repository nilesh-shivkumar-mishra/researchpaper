// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <footer className="bg-primary/5 px-6 md:px-16 mt-10 lg:px-24 xl:px-32">
      {/* ---------- Top area ---------- */}
      <div className="flex flex-col md:flex-row gap-14 py-14 border-b border-gray-300/40">
        {/* Logo & short text */}
        <div className="flex-[1.2] min-w-[220px]">
          <p className="text-2xl font-semibold text-gray-900">ResearchHub</p>
          <p className="mt-6 max-w-[410px] text-gray-500">
            Discover cutting-edge research online. Read anytime, anywhere with ease.
            Order a physical copy to keep forever.
          </p>
        </div>

        {/* COMPANY links */}
        <div className="flex-1 min-w-[120px]">
          <h3 className="text-gray-900 font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About&nbsp;Us
              </Link>
            </li>
            <li>
              <Link to="/Contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
            
          </ul>
        </div>

        {/* GET IN TOUCH */}
        <div className="flex-1 min-w-[120px]">
          <h3 className="text-gray-900 font-semibold mb-4">GET&nbsp;IN&nbsp;TOUCH</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>+1&nbsp;212-456-7890</li>
            <li>
              <a
                href="mailto:contact@foreveryou.com"
                className="hover:text-primary"
              >
                support@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- Bottom line ---------- */}
      <p className="py-6 text-center text-sm md:text-base text-gray-500">
        ©&nbsp;2024&nbsp;Forever.com&nbsp;— All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
