'use client';

import {
  CircleDollarSign,
  CalendarHeart,
} from "lucide-react";
import { motion } from "motion/react";
import { FeatureCard } from "../common/FeatureCard";

export default function AIFeaturesSection() {
  const features = [
    {
      icon: "/venue.svg", 
      title: "Venue Selection",
      description:
        "AI analyzes your preferences, guest count, and budget to recommend perfect venues.",
    },
    {
      icon: CircleDollarSign, 
      title: "Budget Management",
      description:
        "Smart budgeting tools that track expenses and suggest cost-effective alternatives.",
    },
    {
      icon: "/users.svg", 
      title: "Guest list Coordination",
      description:
        "Manage invitations, RSVPs, and dietary requirements with intelligent guest management.",
    },
    {
      icon: CalendarHeart, 
      title: "Scheduling & Timeline",
      description:
        "Create the perfect wedding day timeline with AI-optimized scheduling and vendor coordination.",
    },
  ];

  return (
    <section className='py-20 px-6 bg-primary-50'>
      <div className='max-w-7xl mx-auto text-center'>
        <motion.h2 
          className='text-4xl font-bold text-primary-dark mb-4'
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          AI Powered Wedding Planning
        </motion.h2>
        <motion.p 
          className='text-primary-dark text-lg mb-12 max-w-2xl mx-auto'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Our intelligent platform identifies every detail so you can focus on
          enjoying your special day
        </motion.p>

        <div className='grid md:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1] 
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}




