import React from 'react';
import logo from '../assets/logo.png'; // Place your logo in the assets folder

const Header = () => (
  <header className="bg-gray-800 text-white p-4 flex items-center">
    <img src={logo} alt="its12 Giftworld" className="h-12 w-12 mr-4" />
    <h1 className="text-2xl font-bold">its12 Giftworld</h1>
  </header>
);

export default Header;
