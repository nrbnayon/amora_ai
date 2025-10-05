import React from "react";
import { Button } from "@/components/ui/button";

export const VenueDescriptionSection = () => {
  return (
    <section className='relative w-full flex bg-[url(/image-26.png)] bg-cover bg-center h-[470px]'>
      <div className='absolute inset-0 bg-[#7B0B4E26]'></div>
      <div className='absolute inset-0 flex flex-col items-center justify-center gap-8 px-4 z-10'>
        <div className='flex flex-col items-center gap-4 w-full'>
          <h2 className='font-bold text-white text-5xl leading-tight text-center'>
            Lets Celebrate Your Love
          </h2>
        </div>
        <Button size='lg' className='bg-primary text-white hover:bg-primary/90'>
          Try for free
        </Button>
      </div>
    </section>
  );
};
