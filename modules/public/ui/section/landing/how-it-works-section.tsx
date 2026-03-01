"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  MessageSquare,
  Send,
  Database,
  CheckCircle,
  LogIn,
  MousePointerClick,
  BarChart3,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const flows = [
  {
    title: "Input Data Harian",
    subtitle: "Admin Kantor / Lapangan",
    color: "from-green-500 to-emerald-600",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-500/10",
    textColor: "text-green-600 dark:text-green-400",
    steps: [
      {
        icon: MessageSquare,
        label: "Buka chat WhatsApp bot",
      },
      {
        icon: MousePointerClick,
        label: 'Pilih menu "Input Pengeluaran"',
      },
      {
        icon: Send,
        label: 'Kirim: "Semen 10 sak 500000"',
      },
      {
        icon: Database,
        label: "Bot simpan ke DB & Google Sheet",
      },
      {
        icon: CheckCircle,
        label: "Konfirmasi: Data tersimpan ✓",
      },
    ],
  },
  {
    title: "Monitoring Proyek",
    subtitle: "Owner Proyek",
    color: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-600 dark:text-cyan-400",
    steps: [
      {
        icon: LogIn,
        label: "Login ke aplikasi web",
      },
      {
        icon: MousePointerClick,
        label: "Pilih proyek yang sedang berjalan",
      },
      {
        icon: BarChart3,
        label: "Lihat grafik Kurva S & sisa budget",
      },
      {
        icon: Search,
        label: "Cek detail transaksi mencurigakan",
      },
      {
        icon: CheckCircle,
        label: "Keputusan berdasarkan data ✓",
      },
    ],
  },
];

export function HowItWorksSection() {
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

      // Animate flow columns
      const columns = sectionRef.current?.querySelectorAll(".flow-column");
      columns?.forEach((col, i) => {
        gsap.fromTo(
          col,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: col,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Animate individual steps
      const steps = sectionRef.current?.querySelectorAll(".flow-step");
      steps?.forEach((step, i) => {
        gsap.fromTo(
          step,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.3 + i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
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
      id="how-it-works"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="mb-16 text-center"
          style={{ opacity: 0 }}
        >
          <span className="mb-4 inline-block rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            Cara Kerja
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Simpel &{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Efisien
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Dua alur utama yang membuat manajemen proyek menjadi mudah untuk
            semua pengguna.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {flows.map((flow) => (
            <div
              key={flow.title}
              className={cn(
                "flow-column rounded-2xl border p-6 sm:p-8 bg-card/50 backdrop-blur-sm",
                flow.borderColor,
              )}
              style={{ opacity: 0 }}
            >
              <div className="mb-6">
                <span
                  className={cn(
                    "inline-block rounded-full px-3 py-1 text-xs font-medium",
                    flow.bgColor,
                    flow.textColor,
                  )}
                >
                  {flow.subtitle}
                </span>
                <h3 className="mt-3 text-xl font-bold">{flow.title}</h3>
              </div>

              <div className="space-y-4">
                {flow.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flow-step flex items-center gap-4"
                    style={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white text-sm font-bold",
                          flow.color,
                        )}
                      >
                        {i + 1}
                      </div>
                      <step.icon className="size-5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
