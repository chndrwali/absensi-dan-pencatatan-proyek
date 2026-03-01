"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentTransactions() {
  const trpc = useTRPC();

  const { data: keuangan, isLoading } = useQuery(
    trpc.sheet.getKeuangan.queryOptions(),
  );

  const recentData = keuangan?.data.slice(-10).reverse() ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaksi Terbaru</CardTitle>
        <CardDescription>
          10 transaksi terakhir dari Google Sheet
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : recentData.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Belum ada transaksi
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs text-muted-foreground">
                    {item.tanggal}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.tipe === "Pemasukan" ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {item.tipe}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{item.kategori}</TableCell>
                  <TableCell className="text-sm max-w-[200px] truncate">
                    {item.deskripsi}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(parseFloat(item.jumlah) || 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
