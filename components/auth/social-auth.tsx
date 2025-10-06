// components\auth\social-auth.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const socialProviders = [
  { name: "Google", icon: "/google.svg" },
  { name: "Facebook", icon: "/facebook.svg" },
  { name: "Apple", icon: "/apple.svg" },
];

export function SocialAuth() {
  const [loadingProvider, setLoadingProvider] = React.useState<string | null>(
    null
  );

  const handleSocialAuth = async (provider: string) => {
    setLoadingProvider(provider);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`  ${provider} auth initiated`);
    } catch (error) {
      console.error(`  ${provider} auth failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-10">
        {socialProviders.map((provider) => (
          <Button
            key={provider.name}
            variant="outline"
            onClick={() => handleSocialAuth(provider.name)}
            disabled={loadingProvider !== null}
            className="flex items-center justify-center w-20 h-20 border-none"
            style={{
              backgroundColor: "#FAFCFE",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {loadingProvider === provider.name ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Image
                  src={provider.icon}
                  alt={provider.name}
                  width={24}
                  height={24}
                  className="w-10 h-10"
                />
                <span className="sr-only">Continue with {provider.name}</span>
              </>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
