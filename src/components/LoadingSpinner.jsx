import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} rounded-full border-4 border-gray-300 dark:border-slate-700 border-t-primary dark:border-t-primary`}
      />
      {text && (
        <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
