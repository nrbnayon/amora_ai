import React from "react";
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
          <div key={index} className='flex items-center gap-8 w-full'>
            {feature.imagePosition === "left" ? (
              <>
                <img
                  className={`flex-1 h-[340px] rounded-2xl ${feature.imageClass}`}
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
                />
                <div className='flex flex-col items-start gap-8 flex-1'>
                  <div className='flex flex-col items-start gap-4 w-full'>
                    <h2 className='  font-semibold  text-primary-dark text-4xl tracking-[0] leading-12'>
                      {feature.title}
                    </h2>
                    <p className='  font-normal text-primary text-base tracking-[0] leading-6'>
                      {feature.description}
                    </p>
                  </div>
                  <Button
                    size='lg'
                    className='bg-primary text-white hover:bg-primary/90'
                  >
                    Try for free
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className='flex flex-col items-start gap-8 flex-1'>
                  <div className='flex flex-col items-start gap-4 w-full'>
                    <h2 className='  font-semibold  text-primary-dark text-4xl tracking-[0] leading-12'>
                      {feature.title}
                    </h2>
                    <p className='  font-normal  text-primary-dark text-base tracking-[0] leading-6'>
                      {feature.description}
                    </p>
                  </div>
                  <Button
                    size='lg'
                    className='bg-primary text-white hover:bg-primary/90'
                  >
                    Try for free
                  </Button>
                </div>
                <img
                  className={`flex-1 h-[340px] rounded-2xl ${feature.imageClass}`}
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
                />
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};
