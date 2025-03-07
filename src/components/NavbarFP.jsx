import React from "react";
import { Link } from 'react-router-dom';
const NavbarFP = () => {
  return (
    <>
      <nav className="absolute top-0 left-0 w-full py-4 px-15 flex justify-between items-center z-10 bg-[#0B192C] fixed">
              <h1 className="text-2xl font-bold text-white">StudyBuddy</h1>
              <ul className="flex space-x-10 text-white font-semibold">
                <li>
                  <a href="#home" className="hover:font-bold">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:font-bold">
                    About
                  </a>
                </li>
                <li>
                  <a href="#works" className="hover:font-bold">
                    How it Works
                  </a>
                </li>
                <li>
                  <Link to="/login" className="hover:font-bold">
                    Login
                  </Link>
                </li>
                <li>
                  <a href="#help" className="hover:font-bold">
                    Help
                  </a>
                </li>
              </ul>
            </nav>
    </>
  )
}

export default NavbarFP
