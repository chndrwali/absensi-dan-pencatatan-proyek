"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/use-gsap";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  index: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  index,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(cardRef, (gsap) => {
    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm",
        "transition-all duration-500 hover:-translate-y-2",
        "hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]",
        "hover:border-transparent",
      )}
    >
      {/* Gradient border on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          "bg-gradient-to-br p-[1px]",
          gradient,
        )}
      >
        <div className="h-full w-full rounded-2xl bg-card" />
      </div>

      <div className="relative z-10">
        <div
          className={cn(
            "mb-4 inline-flex rounded-xl p-3",
            "bg-gradient-to-br",
            gradient,
          )}
        >
          <Icon className="size-6 text-white" />
        </div>
        <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
