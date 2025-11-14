import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

// X (Twitter) Icon Component
const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, label: 'Facebook' },
    { icon: XIcon, label: 'X (Twitter)' },
    { icon: FaInstagram, label: 'Instagram' },
    { icon: FaLinkedin, label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-white mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <FaLeaf className="text-green-500 text-2xl" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                SocialServe
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering communities through organized social development initiatives. Join us in making a lasting impact.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded mr-3"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/upcoming-events" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                  Create Event
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded mr-3"></span>
              Contact
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>📧 info@socialserve.com</li>
              <li>📱 +880 1234-567890</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded mr-3"></span>
              Follow Us
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 flex items-center justify-center transition-all duration-300"
                    title={social.label}
                  >
                    <IconComponent className="text-lg" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} <span className="text-green-400 font-semibold">SocialServe</span>. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;