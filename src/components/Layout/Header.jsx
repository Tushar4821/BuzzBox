import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '../../assets/homeImg/logo.png'

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 transition duration-300 ${
      isActive
        ? "text-white"
        : "text-gray-300 hover:text-white"
    }`;

  return (
  <header className="w-full fixed top-0 left-0 z-50 
bg-[#0b0b0f]/90 
backdrop-blur-md 
border-b border-white/10 
shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      
     <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

  {/* Logo - LEFT */}
  <NavLink to="/" className="flex items-center">
  <img
    src={logo}
    alt="BuzzBox Logo"
    className="h-14 object-contain md:h-16"
  />
</NavLink>

  {/* Nav Links - RIGHT */}
  <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

    <NavLink to="/" className={navLinkClass}>
      Home
    </NavLink>

    <NavLink to="/games" className={navLinkClass}>
      Games
    </NavLink>

    <NavLink to="/challenges" className={navLinkClass}>
      Challenges
    </NavLink>

    <NavLink to="/high-mode" className={navLinkClass}>
     High Mode
    </NavLink>

    <NavLink to="/about" className={navLinkClass}>
      About
    </NavLink>

    {/* CTA Button */}
    <NavLink
      to="/games"
      className="ml-4 px-4 py-2 rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold hover:scale-105 transition"
    >
      Play Now
    </NavLink>
  </nav>

  {/* Mobile Menu - RIGHT */}
  <div className="md:hidden">
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <X size={26} /> : <Menu size={26} />}
    </button>
  </div>

</div>

     
      {isOpen && (
        <div className="md:hidden bg-[#0B0B12] border-t border-white/10 px-6 py-6 space-y-4">

          <NavLink to="/" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white">
            Home
          </NavLink>

          <NavLink to="/games" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white">
            Games
          </NavLink>

          <NavLink to="/challenges" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white">
            Challenges
          </NavLink>

          <NavLink to="/high-mode" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white">
            High Mode
          </NavLink>

          <NavLink to="/about" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white">
            About
          </NavLink>

          <NavLink
            to="/games"
            onClick={() => setIsOpen(false)}
            className="block mt-4 text-center px-4 py-2 rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold"
          >
            Play Now
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;