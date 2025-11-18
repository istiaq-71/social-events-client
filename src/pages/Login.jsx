import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'framer-motion';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    signIn(formData.email, formData.password)
      .then(() => {
        toast.success('Logged in successfully! Welcome back 👋');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          toast.error('No account found with this email. Please register first.');
        } else if (error.code === 'auth/wrong-password') {
          toast.error('Incorrect password. Please try again.');
        } else {
          toast.error('Login failed. Please check your credentials and try again.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success('Logged in with Google successfully! 🎉');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error('Google sign-in failed. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 bg-gray-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.8
        }}
        className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">Welcome Back</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors focus:outline-none text-sm sm:text-base min-h-[44px] ${
                errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
              } dark:bg-slate-700 dark:text-white`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors focus:outline-none pr-10 sm:pr-12 text-sm sm:text-base min-h-[44px] ${
                  errors.password
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                } dark:bg-slate-700 dark:text-white`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 25px rgba(34,197,94,0.4)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg min-h-[44px] touch-manipulation"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-slate-600"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300 dark:border-slate-600"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 text-gray-700 dark:text-gray-300"
        >
          <FaGoogle className="text-red-500" />
          <span>Continue with Google</span>
        </motion.button>

        <p className="mt-8 text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-600 dark:text-green-400 font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
