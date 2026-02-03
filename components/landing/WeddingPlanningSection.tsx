'use client';

import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

const features = [
  {
    imageSrc: "/wedding1.png",
    imageAlt: "Dream venue",
    imagePosition: "left",
    title: "Describe your dream venue and we will find it for you",
    description:
      "Browsing through huge catalogs with one-word filters is a thing of the past. we let you be as specific as you can about your ideal vendor",
    imageClass: "object-cover",
  },
  {
    imageSrc: "/wedding2.png",
    imageAlt: "Multicultural wedding",
    imagePosition: "right",
    title: "Multicultural weddings made easy",
    description:
      "From tea ceremony to sangeet, and many others. We support a wide variety of cultural events and let you incorporate different traditions in your wedding.",
    imageClass: "",
  },
  {
    imageSrc: "/wedding3.png",
    imageAlt: "Happy couple",
    imagePosition: "left",
    title: "Loved by brides and grooms all over the world",
    description:
      "Amora AI is the only globally available AI wedding planning platform. Whether you're planning a destination wedding or getting married in your hometown, we are here to help.",
    imageClass: "object-cover",
  },
];

export const WeddingPlanningSection = () => {
  return (
    <div className='max-w-7xl mx-auto py-20  w-full'>
      <section className='flex flex-col w-full items-start gap-6'>
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className='flex items-center gap-8 w-full'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {feature.imagePosition === "left" ? (
              <>
                <motion.img
                  className={`flex-1 h-[340px] rounded-2xl ${feature.imageClass}`}
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
                  initial={{ x: -60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
                <motion.div 
                  className='flex flex-col items-start gap-8 flex-1'
                  initial={{ x: 60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <div className='flex flex-col items-start gap-4 w-full'>
                    <h2 className='  font-semibold  text-primary-dark text-4xl tracking-[0] leading-12'>
                      {feature.title}
                    </h2>
                    <p className='  font-normal text-primary text-base tracking-[0] leading-6'>
                      {feature.description}
                    </p>
                  </div>
                  <motion.div
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
              </>
            ) : (
              <>
                <motion.div 
                  className='flex flex-col items-start gap-8 flex-1'
                  initial={{ x: -60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <div className='flex flex-col items-start gap-4 w-full'>
                    <h2 className='  font-semibold  text-primary-dark text-4xl tracking-[0] leading-12'>
                      {feature.title}
                    </h2>
                    <p className='  font-normal  text-primary-dark text-base tracking-[0] leading-6'>
                      {feature.description}
                    </p>
                  </div>
                  <motion.div
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
                <motion.img
                  className={`flex-1 h-[340px] rounded-2xl ${feature.imageClass}`}
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
                  initial={{ x: 60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
              </>
            )}
          </motion.div>
        ))}
      </section>
    </div>
  );
};
