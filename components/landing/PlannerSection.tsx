'use client';

import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import Image from "next/image";

export const PlannerSection = () => {
  return (
    <section className='py-20 px-6'>
      <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
        <motion.div 
          className='relative'
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Image
            src='/planner.png'
            width={600}
            height={400}
            alt='Wedding planning illustration'
            className='w-full h-auto'
          />
        </motion.div>
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.h2 
            className='text-4xl font-bold text-primary-dark mb-6'
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Planner of Your
            <br />
            Perfect Wedding
          </motion.h2>
          <motion.p 
            className='text-primary-dark text-lg mb-6 leading-relaxed'
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our intelligent platform helps you plan every detail with ease. From
            venue selection to guest management, we make planning your wedding
            as enjoyable as the big day itself.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
        </motion.div>
      </div>
    </section>
  );
};
