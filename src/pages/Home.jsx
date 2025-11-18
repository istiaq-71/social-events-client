import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaHandsHelping, FaMapMarkerAlt, FaArrowRight, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Home = () => {
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
    
    // Validate email
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
      // Get API URL - check both env variable and fallback
      let apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        // If no env variable, try to detect if we're in production
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
          // In production, use the deployed server URL
          apiUrl = 'https://social-events-server.vercel.app';
        } else {
          apiUrl = 'http://localhost:5000';
        }
      }
      console.log('Subscribing with API URL:', apiUrl);
      console.log('Email:', email.trim());
      
      const response = await fetch(`${apiUrl}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim() })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        toast.success('Successfully subscribed to newsletter! 🎉');
        setEmail(''); // Clear the input
      } else {
        console.error('Subscription failed:', data);
        toast.error(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      toast.error(`Error subscribing: ${error.message}. Please check console for details.`);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block bg-green-500 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Join the Movement
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Build a Better Community Together
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Join social development events and make a lasting impact in your neighborhood
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/upcoming-events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center gap-2"
              >
                Explore Events <FaArrowRight />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const aboutSection = document.getElementById('about-section');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-16 bg-gray-50 dark:bg-slate-800">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  {stat.number}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-2">
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
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
      <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-slate-800">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Event Gallery</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Moments captured from our community events
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08 }}
                className="overflow-hidden rounded-2xl shadow-lg aspect-square cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
              </motion.div>
            ))}
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
