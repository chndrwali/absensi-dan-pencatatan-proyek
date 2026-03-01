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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "oklch(0.7 0.15 160)", // green
  "oklch(0.65 0.2 250)", // blue
  "oklch(0.7 0.2 40)", // orange
  "oklch(0.65 0.2 300)", // purple
  "oklch(0.7 0.15 200)", // cyan
  "oklch(0.65 0.2 350)", // pink
];

export function BudgetPieChart() {
  const trpc = useTRPC();

  const { data: keuangan, isLoading } = useQuery(
    trpc.sheet.getKeuangan.queryOptions(),
  );

  // Group expenses by category
  const categoryData =
    keuangan?.data
      .filter((d) => d.tipe === "Pengeluaran")
      .reduce(
        (acc, d) => {
          const cat = d.kategori || "Lainnya";
          acc[cat] = (acc[cat] || 0) + (parseFloat(d.jumlah) || 0);
          return acc;
        },
        {} as Record<string, number>,
      ) ?? {};

  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengeluaran per Kategori</CardTitle>
        <CardDescription>
          Distribusi pengeluaran berdasarkan kategori
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <Skeleton className="h-48 w-48 rounded-full" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
            Belum ada data pengeluaran
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(value)
                }
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--popover-foreground)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
