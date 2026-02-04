import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-sm"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-primary" />
        ) : (
          <Moon className="h-5 w-5 text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
