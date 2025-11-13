import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useTheme } from '../providers/ThemeProvider';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
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
          isActive
            ? 'text-primary font-semibold'
            : 'hover:text-primary transition-colors'
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
      className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-primary"
            >
              🌱 SocialServe
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-primary"
                    title={user.displayName}
                  />
                </button>

                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-2"
                  >
                    <div className="px-4 py-2 border-b dark:border-slate-700">
                      <p className="font-semibold truncate">{user.displayName}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/create-event"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Create Event
                    </Link>
                    <Link
                      to="/manage-events"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Manage Events
                    </Link>
                    <Link
                      to="/joined-events"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Joined Events
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-red-600"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pb-4 space-y-4"
          >
            {navLinks}
            {user ? (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-primary"
                  />
                  <div>
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/create-event"
                  className="block hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Event
                </Link>
                <Link
                  to="/manage-events"
                  className="block hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Events
                </Link>
                <Link
                  to="/joined-events"
                  className="block hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Joined Events
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-left text-red-600 w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="bg-primary text-white px-6 py-2 rounded-lg w-full">
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