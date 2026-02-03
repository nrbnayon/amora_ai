'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      onClick={scrollToContent}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-white text-sm font-medium opacity-80">
          Scroll to explore
        </span>
        <ChevronDown className="w-6 h-6 text-white opacity-80" />
      </motion.div>
    </motion.div>
  );
}
