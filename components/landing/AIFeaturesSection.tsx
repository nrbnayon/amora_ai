import {
  CircleDollarSign,
  CalendarHeart,
} from "lucide-react";
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
        <h2 className='text-4xl font-bold text-primary-dark mb-4'>
          AI Powered Wedding Planning
        </h2>
        <p className='text-primary-dark text-lg mb-12 max-w-2xl mx-auto'>
          Our intelligent platform identifies every detail so you can focus on
          enjoying your special day
        </p>

        <div className='grid md:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


