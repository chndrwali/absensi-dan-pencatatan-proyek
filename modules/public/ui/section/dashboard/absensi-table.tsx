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

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Hadir: "default",
  Izin: "secondary",
  Sakit: "outline",
  Alpha: "destructive",
  Cuti: "secondary",
};

export function AbsensiTable() {
  const trpc = useTRPC();
  const [search, setSearch] = useState("");

  const { data: absensi, isLoading } = useQuery(
    trpc.sheet.getAbsensi.queryOptions(),
  );

  const filteredData =
    absensi?.data.filter(
      (d) =>
        d.nama.toLowerCase().includes(search.toLowerCase()) ||
        d.tanggal.includes(search) ||
        d.status.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Data Absensi</CardTitle>
            <CardDescription>
              {filteredData.length} data ditemukan
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama, tanggal, status..."
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
            {search ? "Tidak ada data yang cocok" : "Belum ada data absensi"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Jam Masuk</TableHead>
                  <TableHead>Jam Keluar</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.tanggal}
                    </TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[item.status] ?? "outline"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{item.jamMasuk}</TableCell>
                    <TableCell className="text-sm">{item.jamKeluar}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
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
