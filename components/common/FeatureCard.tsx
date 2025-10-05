import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import React from "react";

interface FeatureCardProps {
  icon: string | LucideIcon;
  title: string;
  description: string;
  position?: "left" | "center" | "right";
}

export const FeatureCard = ({
  icon,
  title,
  description,
  position = "left",
}: FeatureCardProps) => {
  const isLucideIcon = typeof icon !== "string";

  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  const iconAlignment = {
    left: "",
    center: "mx-auto",
    right: "ml-auto",
  };

  return (
    <Card className='bg-white border-border p-6'>
      <CardContent className={`p-0 ${alignmentClasses[position]}`}>
        <div
          className={`w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4 ${iconAlignment[position]}`}
        >
          {isLucideIcon ? (
            <>
              {React.createElement(icon as LucideIcon, {
                className: "w-6 h-6 text-primary",
              })}
            </>
          ) : (
            <img src={icon as string} alt={title} className='w-6 h-6' />
          )}
        </div>
        <h3 className='font-semibold text-primary-dark mb-2'>{title}</h3>
        <p className='text-primary-dark text-sm'>{description}</p>
      </CardContent>
    </Card>
  );
};
