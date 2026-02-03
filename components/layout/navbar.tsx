"use client";

import { motion } from "motion/react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <motion.header 
      className="bg-white/95 backdrop-blur-sm z-50 px-2 py-5 md:py-7 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="text-primary text-xl md:text-2xl font-bold"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Amora AI
        </motion.div>
        <motion.div 
          className="flex items-center gap-2 sm:gap-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                window.location.href = "/sign-up";
              }}
              className="border-[#1A1A1A] w-24 sm:w-28 md:w-36 p-3 md:p-4 text-sm md:text-base text-foreground hover:text-white hover:bg-primary/90 transition-colors"
            >
              Sign up
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => {
                window.location.href = "/sign-in";
              }}
              className="bg-primary w-24 sm:w-28 md:w-36 p-3 md:p-4 text-sm md:text-base text-white hover:bg-primary/90 transition-colors"
            >
              Sign in
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}
