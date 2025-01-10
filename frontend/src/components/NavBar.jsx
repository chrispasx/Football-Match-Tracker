import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = ({ isAdmin, showAdminForm, handleLogout, setShowAdminForm }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:scale-105 transition-all duration-300 cursor-default">
            Football Stats
          </span>
          
          <button
            className="md:hidden text-gray-300 hover:text-white focus:outline-none transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          <div className={`${
            menuOpen 
              ? "flex flex-col absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 p-4 space-y-4 md:hidden"
              : "hidden md:flex md:items-center md:space-x-8"
          } transition-all duration-500 ease-in-out`}>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">Stats</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">Next Match</a>
            <button
              onClick={() => {
                if (showAdminForm && isAdmin) {
                  handleLogout();
                } else {
                  setShowAdminForm(!showAdminForm);
                }
              }}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white 
                       px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 
                       text-sm font-semibold hover:scale-105 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
            >
              {showAdminForm ? 'Close Admin' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
