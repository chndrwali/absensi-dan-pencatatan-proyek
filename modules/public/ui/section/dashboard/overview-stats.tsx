"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, Users } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function OverviewStats() {
  const trpc = useTRPC();

  const { data: keuangan, isLoading: loadingKeuangan } = useQuery(
    trpc.sheet.getKeuangan.queryOptions(),
  );

  const { data: absensi, isLoading: loadingAbsensi } = useQuery(
    trpc.sheet.getAbsensi.queryOptions(),
  );

  // Calculate stats from data
  const totalPemasukan =
    keuangan?.data
      .filter((d) => d.tipe === "Pemasukan")
      .reduce((sum, d) => sum + (parseFloat(d.jumlah) || 0), 0) ?? 0;

  const totalPengeluaran =
    keuangan?.data
      .filter((d) => d.tipe === "Pengeluaran")
      .reduce((sum, d) => sum + (parseFloat(d.jumlah) || 0), 0) ?? 0;

  const saldo = totalPemasukan - totalPengeluaran;

  const today = new Date().toISOString().split("T")[0];
  const absensiHariIni = absensi?.data.filter((d) => d.tanggal === today) ?? [];
  const hadirHariIni = absensiHariIni.filter(
    (d) => d.status === "Hadir",
  ).length;

  const isLoading = loadingKeuangan || loadingAbsensi;

  const stats = [
    {
      title: "Total Pemasukan",
      value: formatCurrency(totalPemasukan),
      icon: TrendingUp,
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Pengeluaran",
      value: formatCurrency(totalPengeluaran),
      icon: TrendingDown,
      iconColor: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Saldo",
      value: formatCurrency(saldo),
      icon: Wallet,
      iconColor: saldo >= 0 ? "text-cyan-500" : "text-red-500",
      bgColor: saldo >= 0 ? "bg-cyan-500/10" : "bg-red-500/10",
    },
    {
      title: "Hadir Hari Ini",
      value: `${hadirHariIni} orang`,
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`size-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-bold">{stat.value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
