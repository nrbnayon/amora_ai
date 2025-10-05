import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Jake Paul",
    timeAgo: "1 year ago",
    avatar: "/user.png",
    review:
      "I was skeptical at first, but this AI planner exceeded all expectations! It saved us countless hours by automating tasks and offering.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    timeAgo: "1 year ago",
    avatar: "/user.png",
    review:
      "I was skeptical at first, but this AI planner exceeded all expectations! It saved us countless hours by automating tasks and offering.",
  },
  {
    id: 3,
    name: "Mike Smith",
    timeAgo: "1 year ago",
    avatar: "/user.png",
    review:
      "I was skeptical at first, but this AI planner exceeded all expectations! It saved us countless hours by automating tasks and offering.",
  },
  {
    id: 4,
    name: "Mike Smith",
    timeAgo: "1 year ago",
    avatar: "/user.png",
    review:
      "I was skeptical at first, but this AI planner exceeded all expectations! It saved us countless hours by automating tasks and offering.",
  },
  {
    id: 5,
    name: "Mike Smith",
    timeAgo: "1 year ago",
    avatar: "/user.png",
    review:
      "I was skeptical at first, but this AI planner exceeded all expectations! It saved us countless hours by automating tasks and offering.",
  },
];

export const FeaturedPlannerSection = () => {
  return (
    <section className='flex flex-col w-full max-w-7xl mx-auto items-center gap-10 py-10 md:py-20 px-4'>
      <h2 className='font-semibold text-primary-dark text-4xl leading-12 whitespace-nowrap'>
        What couples are saying
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className='w-full max-w-6xl bg-transparent relative'
      >
        <CarouselContent className='-ml-4'>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className='pl-4 md:basis-1/2 lg:basis-1/3'
            >
              <div className='p-1'>
                <Card className='bg-white rounded-2xl shadow-[4px_4px_10px_#00000014] border-0 h-full'>
                  <CardContent className='flex flex-col items-start gap-4 p-6'>
                    <div className='inline-flex items-center gap-3'>
                      <Avatar className='w-12 h-12'>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className='flex flex-col items-start gap-1'>
                        <div className='font-semibold text-texttext-500 text-xl tracking-[0] leading-[24.0px] whitespace-nowrap'>
                          {testimonial.name}
                        </div>

                        <div className='font-normal text-texttext-500 text-sm tracking-[0] leading-[21px] whitespace-nowrap'>
                          {testimonial.timeAgo}
                        </div>
                      </div>
                    </div>

                    <p className='font-normal text-texttext-500 text-base tracking-[0] leading-6'>
                      {testimonial.review}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className='-left-12' />
        <CarouselNext className='-right-12' />
      </Carousel>
    </section>
  );
};
