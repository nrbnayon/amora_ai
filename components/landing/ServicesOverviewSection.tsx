import { CircleDollarSign } from "lucide-react";
import { FeatureCard } from "../common/FeatureCard";

export default function ServicesOverviewSection() {
  const features = [
    {
      icon: "/dashboard.svg",
      title: "Dashboard",
      description:
        "All your wedding details organized in a single view to ease your complexes",
    },
    {
      icon: CircleDollarSign,
      title: "Multiple Events",
      description:
        "From your rehearsal dinner to after party, keep track of all your events",
    },
    {
      icon: "/ai.svg",
      title: "AI Assistant",
      description:
        "Customize your wedding planning bt AI according what you dreamt ",
    },
  ];

  return (
    <section className='py-20 px-6 bg-primary-50'>
      <div className='max-w-7xl mx-auto text-center'>
        <h2 className='text-4xl font-bold text-primary-dark mb-4'>
          A fully featured Planner
        </h2>
        <p className='text-primary-dark text-lg mb-12 max-w-2xl mx-auto'>
          Our intelligent platform handles every detail so you can focus on
          enjoying your special day.
        </p>

        <div className='grid md:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              position='center'
            />
          ))}
        </div>
      </div>
    </section>
  );
}
