"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 p-8 sm:p-12 lg:p-16"
          style={{ opacity: 0 }}
        >
          {/* Background decorations */}
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative z-10 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <Rocket className="size-4" />
              <span>Siap Memulai?</span>
            </div>

            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Mulai Kelola Proyek Anda Sekarang
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
              Daftar gratis dan nikmati kemudahan manajemen proyek konstruksi
              yang transparan dan terintegrasi.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  className="group bg-white text-blue-700 hover:bg-white/90 shadow-xl shadow-blue-900/30 px-8 font-bold"
                >
                  Daftar Gratis Sekarang
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8"
                >
                  Sudah Punya Akun? Masuk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
