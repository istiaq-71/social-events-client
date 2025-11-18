import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useTheme } from '../providers/ThemeProvider';
import { FaSun, FaMoon, FaBars, FaTimes, FaLeaf, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success('Logged out successfully!');
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      })
      .catch(error => {
        toast.error('Error logging out');
      });
  };

  const navLinks = (
    <>
      <NavLink
        to="/upcoming-events"
        className={({ isActive }) =>
          `px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all min-h-[44px] flex items-center ${
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`
        }
        onClick={() => setIsMenuOpen(false)}
      >
        Upcoming Events
      </NavLink>
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        mass: 0.8
      }}
      className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800"
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 group min-w-0 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center space-x-1"
            >
              <FaLeaf className="text-green-600 text-base sm:text-lg md:text-xl lg:text-2xl flex-shrink-0" />
              <span className="hidden min-[375px]:inline truncate">SocialServe</span>
              <span className="min-[375px]:hidden">SS</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-gray-300 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FaMoon className="text-base sm:text-lg" /> : <FaSun className="text-base sm:text-lg" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Profile Picture with Dropdown */}
                <div className="relative hidden lg:block">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none group touch-manipulation min-w-[44px] min-h-[44px]"
                    aria-label="User menu"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={user.photoURL || 'https://via.placeholder.com/40'}
                      alt={user.displayName}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary object-cover"
                      title={user.displayName}
                    />
                  </button>

                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl py-2 border border-gray-100 dark:border-slate-700 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">{user.displayName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/create-event"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors min-h-[44px] flex items-center"
                      >
                        ➕ Create Event
                      </Link>
                      <Link
                        to="/manage-events"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors min-h-[44px] flex items-center"
                      >
                        📋 Manage Events
                      </Link>
                      <Link
                        to="/joined-events"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors min-h-[44px] flex items-center"
                      >
                        ✓ Joined Events
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Logout Button - Visible in Navbar */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={handleLogout}
                  className="hidden lg:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold shadow-lg transition-all text-sm sm:text-base touch-manipulation min-h-[44px]"
                  title="Logout"
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="text-sm sm:text-base" />
                  <span className="hidden xl:inline">Logout</span>
                </motion.button>
              </div>
            ) : (
              <Link to="/login" className="hidden lg:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base touch-manipulation min-h-[44px]"
                >
                  Login
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FaTimes className="text-lg sm:text-xl" /> : <FaBars className="text-lg sm:text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 space-y-1 border-t border-gray-100 dark:border-slate-800 mt-2"
          >
            {navLinks}
            {user ? (
              <>
                <div className="flex items-center space-x-3 py-3 px-3 border-t border-gray-100 dark:border-slate-800 mt-2">
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-primary object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white truncate text-sm sm:text-base">{user.displayName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/create-event"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 transition-colors min-h-[44px] flex items-center"
                >
                  ➕ Create Event
                </Link>
                <Link
                  to="/manage-events"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 transition-colors min-h-[44px] flex items-center"
                >
                  📋 Manage Events
                </Link>
                <Link
                  to="/joined-events"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 transition-colors min-h-[44px] flex items-center"
                >
                  ✓ Joined Events
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors min-h-[44px] flex items-center"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 mt-2">
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-lg font-semibold min-h-[44px] touch-manipulation">
                  Login
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;