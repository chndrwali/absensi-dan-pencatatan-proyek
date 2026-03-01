"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Heading animation
      tl.fromTo(
        headingRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      );

      // Subtitle
      tl.fromTo(
        subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );

      // Floating particles
      const particles =
        particlesRef.current?.querySelectorAll(".hero-particle");
      if (particles) {
        particles.forEach((p, i) => {
          const size = gsap.utils.random(3, 8);
          const startX = gsap.utils.random(0, window.innerWidth);
          const startY = gsap.utils.random(0, window.innerHeight);

          gsap.set(p, {
            width: size,
            height: size,
            x: startX,
            y: startY,
            opacity: 0,
          });

          gsap.to(p, {
            y: startY - gsap.utils.random(200, 600),
            x: startX + gsap.utils.random(-100, 100),
            opacity: gsap.utils.random(0.1, 0.4),
            duration: gsap.utils.random(6, 14),
            ease: "none",
            repeat: -1,
            delay: i * 0.3,
            onRepeat: function () {
              gsap.set(p, {
                y: window.innerHeight + 20,
                x: gsap.utils.random(0, window.innerWidth),
              });
            },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-600/5" />
        <div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 size-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 w-full border-t border-foreground"
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 h-full border-l border-foreground"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div
        ref={particlesRef}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full"
            style={{
              backgroundColor:
                i % 2 === 0 ? "oklch(0.7 0.15 200)" : "oklch(0.6 0.18 250)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-600 dark:text-cyan-400">
          <Sparkles className="size-4" />
          <span>Solusi Manajemen Proyek Konstruksi</span>
        </div>

        <h1
          ref={headingRef}
          className="mb-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ opacity: 0 }}
        >
          Kelola Proyek{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Konstruksi
          </span>{" "}
          Lebih Mudah
        </h1>

        <p
          ref={subRef}
          className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          style={{ opacity: 0 }}
        >
          Input data via WhatsApp, pantau progres real-time di dashboard, dan
          sinkronisasi otomatis dengan Google Sheets. Transparan, efisien, dan
          profesional.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ opacity: 0 }}
        >
          <Link href="/register">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl hover:shadow-cyan-500/30 transition-all px-8"
            >
              Mulai Gratis
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="border-border/50 backdrop-blur-sm px-8"
            >
              Masuk ke Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
