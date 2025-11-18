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
          `px-3 py-2 rounded-lg font-medium transition-all ${
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center space-x-1"
            >
              <FaLeaf className="text-green-600" />
              <span>SocialServe</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-gray-300"
              title="Toggle theme"
            >
              {theme === 'light' ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* Profile Picture with Dropdown */}
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none group"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={user.photoURL || 'https://via.placeholder.com/40'}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2 border-primary object-cover"
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
                        className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        ➕ Create Event
                      </Link>
                      <Link
                        to="/manage-events"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        📋 Manage Events
                      </Link>
                      <Link
                        to="/joined-events"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        ✓ Joined Events
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Logout Button - Visible in Navbar */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all"
                  title="Logout"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Login
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-2 border-t border-gray-100 dark:border-slate-800"
          >
            {navLinks}
            {user ? (
              <>
                <div className="flex items-center space-x-3 py-3 px-3">
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{user.displayName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/create-event"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
                >
                  ➕ Create Event
                </Link>
                <Link
                  to="/manage-events"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
                >
                  📋 Manage Events
                </Link>
                <Link
                  to="/joined-events"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
                >
                  ✓ Joined Events
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block">
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2.5 rounded-lg font-semibold">
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