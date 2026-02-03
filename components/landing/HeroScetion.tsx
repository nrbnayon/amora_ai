'use client';

import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { ScrollIndicator } from "../animations/ScrollIndicator";

export default function HeroSection() {
  return (
    <section className='relative w-full h-screen overflow-hidden'>
      {/* Background Image with Parallax Effect */}
      <motion.div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url('/hero.png')`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Subtle overlay for better text readability */}
        <motion.div 
          className='absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
      </motion.div>

      {/* Content Container - positioned from top, accounting for navbar */}
      <div className='relative h-full flex items-end justify-center pt-20 md:pt-24'>
        {/* Text Content - 175px from bottom */}
        <div className='pb-32 text-center text-white max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6'>
          <motion.h1 
            className='text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.25, 0.4, 0.25, 1] 
            }}
          >
            Plan Your Dream Wedding With AI
          </motion.h1>
          <motion.p 
            className='text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-7 md:mb-8 leading-relaxed opacity-95'
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              ease: [0.25, 0.4, 0.25, 1] 
            }}
          >
            Our AI wedding planner designs a wedding as unique as you love
            story, enhanced by human expert planners — delivered in just 72
            hours. Save time, money, and stress while creating memories to last
            a lifetime.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.7,
              ease: [0.25, 0.4, 0.25, 1] 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size='lg'
              className='bg-primary text-white hover:bg-primary/90 transition-all duration-300'
            >
              Try for free
            </Button>
          </motion.div>
        </div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
}
