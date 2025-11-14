import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomDatePicker = ({ selected, onChange, minDate, placeholder = "Select date", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selected ? new Date(selected) : new Date());
  const [view, setView] = useState('calendar'); // 'calendar' or 'year'
  const datePickerRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDateObj = minDate ? (() => {
    const date = new Date(minDate);
    date.setHours(0, 0, 0, 0);
    return date;
  })() : today;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
        setView('calendar');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isDateDisabled = (date) => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < minDateObj;
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(selectedDate)) {
      onChange(selectedDate);
      setIsOpen(false);
      setView('calendar');
    }
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleYearSelect = (year) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setView('calendar');
  };

  const formatDisplayDate = (date) => {
    if (!date) return '';
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return '';
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  // Generate years for year picker
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y <= currentYear + 5; y++) {
    years.push(y);
  }

  return (
    <div ref={datePickerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none flex items-center justify-between ${
          selected
            ? 'border-green-500 dark:border-green-500 bg-green-50 dark:bg-green-900/20'
            : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
        } dark:bg-slate-800`}
      >
        <span className={selected ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
          {selected ? formatDisplayDate(selected) : placeholder}
        </span>
        <FaCalendarAlt className="text-green-600 dark:text-green-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-4 w-80"
          >
            {view === 'calendar' ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => handleMonthChange(-1)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => setView('year')}
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors font-semibold text-gray-900 dark:text-white"
                  >
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </button>
                  <button
                    onClick={() => handleMonthChange(1)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <FaChevronRight className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Day names */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    if (day === null) {
                      return <div key={index} />;
                    }

                    const date = new Date(year, month, day);
                    const isDisabled = isDateDisabled(date);
                    const isSelected = selected && 
                      date.getDate() === selected.getDate() &&
                      date.getMonth() === selected.getMonth() &&
                      date.getFullYear() === selected.getFullYear();
                    const isToday = date.getDate() === today.getDate() &&
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear();

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleDateSelect(day)}
                        disabled={isDisabled}
                        className={`
                          aspect-square rounded-lg text-sm font-medium transition-all
                          ${isDisabled
                            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            : isSelected
                            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg scale-110'
                            : isToday
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                          }
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {/* Year picker */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setView('calendar')}
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors font-semibold text-gray-900 dark:text-white"
                  >
                    ← Back
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {years.map(y => (
                    <button
                      key={y}
                      onClick={() => handleYearSelect(y)}
                      className={`p-3 rounded-lg font-medium transition-all ${
                        y === currentMonth.getFullYear()
                          ? 'bg-green-500 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDatePicker;

