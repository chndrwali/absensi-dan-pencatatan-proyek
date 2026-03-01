"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { cn } from "@/lib/utils";

const techStack = [
  {
    name: "Next.js",
    category: "Frontend",
    gradient:
      "from-neutral-600 to-neutral-800 dark:from-neutral-300 dark:to-neutral-100",
    textClass: "text-white dark:text-black",
  },
  {
    name: "tRPC",
    category: "API",
    gradient: "from-blue-500 to-blue-700",
    textClass: "text-white",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    gradient: "from-sky-600 to-indigo-700",
    textClass: "text-white",
  },
  {
    name: "Prisma",
    category: "ORM",
    gradient: "from-teal-500 to-cyan-700",
    textClass: "text-white",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    gradient: "from-cyan-400 to-blue-500",
    textClass: "text-white",
  },
  {
    name: "shadcn/ui",
    category: "UI Library",
    gradient:
      "from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-neutral-400",
    textClass: "text-white dark:text-black",
  },
  {
    name: "Recharts",
    category: "Charts",
    gradient: "from-rose-500 to-pink-600",
    textClass: "text-white",
  },
  {
    name: "Google Sheets",
    category: "Integration",
    gradient: "from-green-500 to-emerald-600",
    textClass: "text-white",
  },
  {
    name: "WhatsApp API",
    category: "Bot",
    gradient: "from-green-600 to-green-800",
    textClass: "text-white",
  },
  {
    name: "Vercel",
    category: "Deployment",
    gradient: "from-neutral-700 to-black dark:from-neutral-300 dark:to-white",
    textClass: "text-white dark:text-black",
  },
];

export function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      const badges = sectionRef.current?.querySelectorAll(".tech-badge");
      badges?.forEach((badge, i) => {
        gsap.fromTo(
          badge,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.06,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: badge,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative py-24 sm:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-600/[0.02] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="mb-16 text-center"
          style={{ opacity: 0 }}
        >
          <span className="mb-4 inline-block rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            Teknologi
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Dibangun dengan{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Tech Stack Modern
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Menggunakan teknologi terbaik untuk performa, keamanan, dan
            developer experience yang optimal.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="tech-badge group"
              style={{ opacity: 0 }}
            >
              <div
                className={cn(
                  "relative rounded-xl bg-gradient-to-r px-5 py-3 transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-lg cursor-default",
                  tech.gradient,
                )}
              >
                <div className={cn("text-sm font-bold", tech.textClass)}>
                  {tech.name}
                </div>
                <div className={cn("text-xs opacity-80", tech.textClass)}>
                  {tech.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
