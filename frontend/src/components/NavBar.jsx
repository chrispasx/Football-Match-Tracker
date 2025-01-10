import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = ({ isAdmin, showAdminForm, handleLogout, setShowAdminForm }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Football Stats
          </span>
          <button
            className="md:hidden text-gray-300 focus:outline-none transition-all duration-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } md:flex items-center space-x-8 transition-all duration-500`}
          >
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Stats</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Next Match</a>
            <button
              onClick={() => {
                if (showAdminForm && isAdmin) {
                  handleLogout();
                } else {
                  setShowAdminForm(!showAdminForm);
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                       px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 
                       text-sm font-semibold hover:scale-105"
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
