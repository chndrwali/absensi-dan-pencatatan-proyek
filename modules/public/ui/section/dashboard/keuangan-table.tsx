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
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Search } from "lucide-react";

export function KeuanganTable() {
  const trpc = useTRPC();
  const [search, setSearch] = useState("");

  const { data: keuangan, isLoading } = useQuery(
    trpc.sheet.getKeuangan.queryOptions(),
  );

  const filteredData =
    keuangan?.data.filter(
      (d) =>
        d.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
        d.kategori.toLowerCase().includes(search.toLowerCase()) ||
        d.tanggal.includes(search) ||
        d.tipe.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Data Keuangan</CardTitle>
            <CardDescription>
              {filteredData.length} transaksi ditemukan
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari deskripsi, kategori, tipe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            {search ? "Tidak ada data yang cocok" : "Belum ada data keuangan"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
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
                    <TableCell className="text-right text-sm font-medium whitespace-nowrap">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(parseFloat(item.jumlah) || 0)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">
                      {item.keterangan}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
