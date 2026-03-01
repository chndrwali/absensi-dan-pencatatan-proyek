"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, AlertCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  Hadir: {
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  Izin: {
    icon: Clock,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  Sakit: {
    icon: AlertCircle,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  Alpha: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  Cuti: {
    icon: Clock,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
} as const;

export function AttendanceSummary() {
  const trpc = useTRPC();

  const { data: absensi, isLoading } = useQuery(
    trpc.sheet.getAbsensi.queryOptions(),
  );

  const today = new Date().toISOString().split("T")[0];
  const absensiHariIni = absensi?.data.filter((d) => d.tanggal === today) ?? [];

  const summary = Object.entries(statusConfig).map(([status, config]) => ({
    status,
    count: absensiHariIni.filter((d) => d.status === status).length,
    ...config,
  }));

  const totalHariIni = absensiHariIni.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Absensi Hari Ini</CardTitle>
        <CardDescription>
          {today} · {totalHariIni} data tercatat
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {summary.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("rounded-lg p-2", item.bg)}>
                    <item.icon className={cn("size-4", item.color)} />
                  </div>
                  <span className="text-sm font-medium">{item.status}</span>
                </div>
                <span className="text-2xl font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
