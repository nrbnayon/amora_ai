import React from "react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className='relative w-full h-screen overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url('/hero.png')`,
        }}
      >
        {/* Subtle overlay for better text readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30'></div>
      </div>

      {/* Content Container - positioned from top, accounting for navbar */}
      <div className='relative h-full flex items-end justify-center pt-20 md:pt-24'>
        {/* Text Content - 175px from bottom */}
        <div className='pb-32 text-center text-white max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight'>
            Plan Your Dream Wedding With AI
          </h1>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-7 md:mb-8 leading-relaxed opacity-95'>
            Our AI wedding planner designs a wedding as unique as you love
            story, enhanced by human expert planners — delivered in just 72
            hours. Save time, money, and stress while creating memories to last
            a lifetime.
          </p>
          <Button
            size='lg'
            className='bg-primary text-white hover:bg-primary/90'
          >
            Try for free
          </Button>
        </div>
      </div>
    </section>
  );
}
