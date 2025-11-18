import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'framer-motion';
import { FaGoogle, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    return {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasMinLength: password.length >= 6
    };
  };

  const passwordReqs = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordReqs).every(Boolean);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.photoURL.trim()) {
      newErrors.photoURL = 'Photo URL is required';
    } else {
      try {
        new URL(formData.photoURL);
      } catch {
        newErrors.photoURL = 'Please enter a valid URL';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isPasswordValid) {
      newErrors.password = 'Password does not meet requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    createUser(formData.email, formData.password)
      .then(() => {
        updateUserProfile(formData.name, formData.photoURL)
          .then(() => {
            toast.success('Account created successfully! Welcome 🎉');
            navigate('/');
          })
          .catch((error) => {
            toast.error('Error updating profile. Please try again.');
            console.error(error);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('This email is already registered. Please log in instead.');
        } else if (error.code === 'auth/weak-password') {
          toast.error('Password is too weak. Please use a stronger password.');
        } else {
          toast.error('Registration failed. Please try again.');
        }
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success('Registered with Google successfully! 🎉');
        navigate('/');
      })
      .catch((error) => {
        toast.error('Google sign-up failed. Please try again.');
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const PasswordRequirement = ({ met, text }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <FaCheck className="text-green-500" />
      ) : (
        <FaTimes className="text-gray-400" />
      )}
      <span className={met ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-200/50 dark:border-slate-700/50"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-block mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              🎉 Join Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Create Your Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">Join our community today</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm sm:text-base md:text-lg min-h-[44px] ${
                errors.name
                  ? 'border-red-500 focus:border-red-500 dark:border-red-500'
                  : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
              } dark:bg-slate-800/50`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span>⚠️</span> {errors.name}
            </p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm sm:text-base md:text-lg min-h-[44px] ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 dark:border-red-500'
                  : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
              } dark:bg-slate-800/50`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span>⚠️</span> {errors.email}
            </p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm sm:text-base md:text-lg min-h-[44px] ${
                errors.photoURL
                  ? 'border-red-500 focus:border-red-500 dark:border-red-500'
                  : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
              } dark:bg-slate-800/50`}
              placeholder="https://example.com/photo.jpg"
            />
            {errors.photoURL && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span>⚠️</span> {errors.photoURL}
            </p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm sm:text-base md:text-lg min-h-[44px] pr-10 sm:pr-12 ${
                  errors.password
                    ? 'border-red-500 focus:border-red-500 dark:border-red-500'
                    : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                } dark:bg-slate-800/50`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span>⚠️</span> {errors.password}
            </p>}

            {formData.password && (
              <div className="mt-4 space-y-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl border border-gray-200 dark:border-slate-600">
                <PasswordRequirement met={passwordReqs.hasUpperCase} text="One uppercase letter" />
                <PasswordRequirement met={passwordReqs.hasLowerCase} text="One lowercase letter" />
                <PasswordRequirement met={passwordReqs.hasMinLength} text="At least 6 characters" />
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !isPasswordValid}
            className="w-full bg-gradient-to-r from-green-600 via-green-500 to-blue-600 text-white py-3 sm:py-4 rounded-xl font-bold hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg min-h-[44px] touch-manipulation relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Creating account...
                </>
              ) : (
                <>
                  ✨ Create Account
                </>
              )}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            />
          </motion.button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-slate-600"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300 dark:border-slate-600"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 sm:space-x-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-gray-300 dark:border-slate-600 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all disabled:opacity-50 text-base sm:text-lg shadow-lg min-h-[44px] touch-manipulation"
        >
          <FaGoogle className="text-red-500 text-xl" />
          <span>Sign up with Google</span>
        </motion.button>

        <p className="mt-8 text-center text-gray-600 dark:text-gray-300 text-lg">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 dark:text-green-400 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;