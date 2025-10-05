import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export const PlannerSection = () => {
  return (
    <section className='py-20 px-6'>
      <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
        <div className='relative'>
          <Image
            src='/planner.png'
            width={600}
            height={400}
            alt='Wedding planning illustration'
            className='w-full h-auto'
          />
        </div>
        <div>
          <h2 className='text-4xl font-bold text-primary-dark mb-6'>
            Planner of Your
            <br />
            Perfect Wedding
          </h2>
          <p className='text-primary-dark text-lg mb-6 leading-relaxed'>
            Our intelligent platform helps you plan every detail with ease. From
            venue selection to guest management, we make planning your wedding
            as enjoyable as the big day itself.
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
};
