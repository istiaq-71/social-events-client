import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaHandsHelping, FaMapMarkerAlt, FaArrowRight, FaStar, FaFacebook, FaPhone, FaWhatsapp, FaEnvelope, FaLinkedin, FaQuoteLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Home = () => {
  const FOUNDER_PHOTO_URL = 'https://i.imgur.com/pyCUtn2.jpg';
  
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const features = [
    {
      icon: <FaCalendarAlt className="text-5xl" />,
      title: 'Create Events',
      description: 'Easily organize social development events in your community',
      color: 'bg-blue-500'
    },
    {
      icon: <FaUsers className="text-5xl" />,
      title: 'Join Community',
      description: 'Connect with like-minded people and make a difference together',
      color: 'bg-green-500'
    },
    {
      icon: <FaHandsHelping className="text-5xl" />,
      title: 'Make Impact',
      description: 'Participate in meaningful activities that improve society',
      color: 'bg-purple-500'
    },
    {
      icon: <FaMapMarkerAlt className="text-5xl" />,
      title: 'Local Events',
      description: 'Find and join events happening near your location',
      color: 'bg-orange-500'
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500',
    'https://images.unsplash.com/photo-1622556498246-755f44ca76f3?w=500',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500'
  ];

  const stats = [
    { number: '5K+', label: 'Active Members' },
    { number: '150+', label: 'Events Created' },
    { number: '2K+', label: 'Lives Impacted' },
    { number: '25', label: 'Locations' }
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    
    try {
      let apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
          apiUrl = 'https://social-events-server.vercel.app';
        } else {
          apiUrl = 'http://localhost:5000';
        }
      }
      
      const response = await fetch(`${apiUrl}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Successfully subscribed to newsletter! 🎉');
        setEmail('');
      } else {
        toast.error(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <section className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[650px] bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 max-w-6xl mx-auto py-8 sm:py-12 md:py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-block bg-green-500 text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              ✨ Join the Movement
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 0.8
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2"
          >
            Build a Better Community Together
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
          >
            Join social development events and make a lasting impact in your neighborhood
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5,
              type: "spring",
              stiffness: 120,
              damping: 18
            }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
          >
            <Link to="/upcoming-events" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 25px rgba(34,197,94,0.4)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px] touch-manipulation"
              >
                Explore Events <FaArrowRight />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => {
                const aboutSection = document.getElementById('about-section');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all text-sm sm:text-base min-h-[44px] touch-manipulation"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-8 sm:py-12 md:py-16 bg-gray-50 dark:bg-slate-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center px-2"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  {stat.number}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-800 dark:to-slate-900">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8
            }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              About <span className="text-green-600 dark:text-green-400">SocialServe</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              Your platform for organizing and joining meaningful social development events
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.8
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                What We Do
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                SocialServe is a community-driven platform that connects individuals and organizations 
                to create positive social impact. We facilitate various types of events including:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span><strong>Cleanup Events:</strong> Beach cleanups, park beautification, river restoration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span><strong>Plantation Drives:</strong> Tree planting, community gardens, reforestation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span><strong>Donation Campaigns:</strong> Clothes, food, school supplies, blood donation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span><strong>Education Programs:</strong> Workshops, literacy programs, skill development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span><strong>Healthcare Initiatives:</strong> Health camps, awareness sessions, medical support</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.8
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                How It Works
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Create or Discover Events</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Browse upcoming events in your area or create your own event to bring people together for a cause.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Join Events</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Simply click "Join Event" to participate. Track all your joined events in one place.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Make an Impact</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Show up on the event date and contribute to making your community a better place.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Manage Your Events</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      If you created an event, manage it easily - update details, see participants, and more.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8
            }}
            className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-lg mb-6 text-green-100 max-w-2xl mx-auto">
              Join thousands of volunteers who are actively working to create positive change in their communities. 
              Every small action counts, and together we can achieve great things.
            </p>
            <Link to="/upcoming-events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Get Started Now <FaArrowRight className="inline-block ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-green-600 dark:text-green-400">SocialServe?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Empowering communities through organized social development initiatives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-slate-700"
              >
                <div className={`w-16 h-16 rounded-xl ${feature.color} text-white flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 dark:bg-green-500/3 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-3xl"
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8
            }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="inline-block mb-4"
            >
              <span className="bg-gradient-to-r from-green-500/20 to-blue-500/20 dark:from-green-500/10 dark:to-blue-500/10 px-4 py-2 rounded-full text-sm font-semibold text-green-700 dark:text-green-400 border border-green-500/30 dark:border-green-500/20">
                📸 Photo Gallery
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 120,
                damping: 18
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-green-600 to-blue-600 dark:from-white dark:via-green-400 dark:to-blue-400 bg-clip-text text-transparent"
            >
              Event Gallery
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="text-gray-600 dark:text-gray-400 text-lg md:text-xl"
            >
              Moments captured from our community events
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8,
                  rotateY: -20,
                  y: 60
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0,
                  y: 0
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  delay: index * 0.12,
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 0.8
                }}
                whileHover={{ 
                  scale: 1.08,
                  rotateY: 3,
                  rotateX: 2,
                  y: -10,
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                className="group relative overflow-hidden rounded-2xl shadow-xl aspect-square cursor-pointer perspective-1000"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 0.6
                  }}
                />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.4
                  }}
                />
                
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="absolute bottom-0 left-0 right-0 p-6 text-white"
                >
                  <motion.h3
                    initial={{ x: -30, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.15,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    className="text-xl font-bold mb-2"
                  >
                    Event {index + 1}
                  </motion.h3>
                  <motion.p
                    initial={{ x: -30, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    className="text-sm text-gray-200"
                  >
                    Community Impact
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0, rotate: -45, opacity: 0 }}
                  whileHover={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20
                  }}
                  className="absolute top-4 right-4 w-12 h-12 bg-green-500/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="text-white text-xl"
                  >
                    ✨
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="absolute inset-0 rounded-2xl border-2 border-green-400/50 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                />
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <Link to="/upcoming-events">
              <motion.button
                whileHover={{ 
                  scale: 1.08, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(34,197,94,0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                View All Events <FaArrowRight className="inline-block ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8
            }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="inline-block mb-4"
            >
              <span className="bg-gradient-to-r from-green-500/30 to-blue-500/30 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold text-white border border-white/20">
                👨‍💼 Leadership
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 120,
                damping: 18
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white"
            >
              Meet the <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Founder</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              The Visionary Behind SocialServe
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.8
              }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.5, 0.75, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1]
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-3xl blur-2xl -z-10"
                />
                
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 2, y: -5 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm"
                >
                  <img
                    src={FOUNDER_PHOTO_URL}
                    alt="Md. Istiaq Hossain - Founder of SocialServe"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop';
                      }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20,
                    delay: 0.5 
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2"
                >
                  <FaStar className="text-yellow-300 animate-pulse" />
                  <span className="font-bold">Founder</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Founder Info */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.8,
                delay: 0.2
              }}
              className="space-y-6"
            >
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 120,
                    damping: 18
                  }}
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                >
                  Md. Istiaq Hossain
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  className="text-xl text-green-400 font-semibold mb-6"
                >
                  Founder & Visionary Leader
                </motion.p>
              </div>

              {/* Vision Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 relative"
              >
                <FaQuoteLeft className="text-green-400 text-3xl mb-4 opacity-50" />
                <p className="text-lg text-gray-200 leading-relaxed italic mb-4">
                  "My vision is to create a platform where every individual can contribute to building stronger, 
                  more connected communities. Through SocialServe, we're not just organizing events—we're 
                  fostering a movement of positive change, one event at a time. Together, we can transform 
                  neighborhoods, empower communities, and create lasting social impact."
                </p>
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-12 h-0.5 bg-green-400"></div>
                  <span className="text-sm font-semibold">Vision Statement</span>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FaEnvelope className="text-green-400" />
                  Get in Touch
                </h4>
                <div className="space-y-3">
                  <motion.a
                    href="tel:+8801851880178"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-3 text-gray-200 hover:text-green-400 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <FaPhone className="text-green-400" />
                    </div>
                    <span className="font-medium">+880 1851-880178</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://wa.me/8801401572207"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-3 text-gray-200 hover:text-green-400 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <FaWhatsapp className="text-green-400 text-lg" />
                    </div>
                    <span className="font-medium">WhatsApp: +880 1401-572207</span>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:istiaqhossain71@gmail.com"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-3 text-gray-200 hover:text-green-400 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <FaEnvelope className="text-green-400" />
                    </div>
                    <span className="font-medium">istiaqhossain71@gmail.com</span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-4"
              >
                <span className="text-gray-300 font-medium">Connect:</span>
                <motion.a
                  href="https://www.facebook.com/Istiaq1971/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all"
                  aria-label="Facebook Profile"
                >
                  <FaFacebook className="text-xl" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-green-100 mb-8">
              Subscribe to our newsletter and never miss upcoming events in your area
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isSubscribing}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubscribing}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
