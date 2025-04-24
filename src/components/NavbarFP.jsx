import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu, X } from "lucide-react"; // Lucide icons (can use Heroicons too)

const NavbarFP = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B192C] px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">StudyBuddy</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-white font-semibold">
          <li><a href="#home" className="hover:font-bold">Home</a></li>
          <li><a href="#about" className="hover:font-bold">About</a></li>
          <li><a href="#works" className="hover:font-bold">How it Works</a></li>
          <li><Link to="/login" className="hover:font-bold">Login</Link></li>
          <li><a href="#help" className="hover:font-bold">Help</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <ul className="md:hidden mt-4 flex flex-col space-y-4 text-white font-semibold px-4 pb-4 bg-[#0B192C]">
          <li><a href="#home" onClick={toggleMenu} className="hover:font-bold">Home</a></li>
          <li><a href="#about" onClick={toggleMenu} className="hover:font-bold">About</a></li>
          <li><a href="#works" onClick={toggleMenu} className="hover:font-bold">How it Works</a></li>
          <li><Link to="/login" onClick={toggleMenu} className="hover:font-bold">Login</Link></li>
          <li><a href="#help" onClick={toggleMenu} className="hover:font-bold">Help</a></li>
        </ul>
      )}
    </nav>
  );
};

export default NavbarFP;
