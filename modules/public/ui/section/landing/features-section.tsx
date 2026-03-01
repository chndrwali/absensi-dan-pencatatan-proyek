"use client";

import { useRef } from "react";
import { FeatureCard } from "@/modules/public/ui/components/landing/feature-card";
import {
  MessageSquare,
  LayoutDashboard,
  Sheet,
  FolderKanban,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { useEffect } from "react";

const features = [
  {
    icon: MessageSquare,
    title: "WhatsApp Bot",
    description:
      "Input data langsung dari WhatsApp. Cukup kirim pesan, bot otomatis mencatat pengeluaran, absensi, dan stok material.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: LayoutDashboard,
    title: "Web Dashboard",
    description:
      "Monitor semua proyek dari satu dashboard. Lihat grafik Kurva S, pie chart budget, dan rekap absensi secara real-time.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Sheet,
    title: "Google Sheets Sync",
    description:
      "Sinkronisasi 2 arah dengan Google Sheets. Data selalu up-to-date di spreadsheet dan aplikasi secara bersamaan.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: FolderKanban,
    title: "Manajemen Proyek",
    description:
      "CRUD proyek lengkap. Atur budget, durasi, dan pantau progres setiap proyek konstruksi dengan mudah.",
    gradient: "from-purple-500 to-pink-600",
  },
];

export function FeaturesSection() {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="mb-16 text-center"
          style={{ opacity: 0 }}
        >
          <span className="mb-4 inline-block rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            Fitur Unggulan
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Semua yang Anda Butuhkan{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              dalam Satu Platform
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Dari input data lapangan hingga monitoring real-time, ProyekKu
            menyediakan semua tools untuk mengelola proyek konstruksi Anda.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
