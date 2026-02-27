"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { absensiSchema, type AbsensiFormValues } from "@/lib/form-schema";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { appToast } from "@/components/custom/app-toast";

export const AbsensiForm = () => {
  const [loading, setLoading] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<AbsensiFormValues>({
    resolver: zodResolver(absensiSchema),
    defaultValues: {
      tanggal: new Date().toISOString().split("T")[0],
      nama: "",
      status: "",
      jamMasuk: "",
      jamKeluar: "",
      keterangan: "",
    },
  });

  const addAbsensi = useMutation(
    trpc.sheet.addAbsensi.mutationOptions({
      onMutate: () => setLoading(true),
      onSuccess: () => {
        appToast.success("Absensi berhasil dicatat!");
        form.reset();
        queryClient.invalidateQueries({
          queryKey: trpc.sheet.getAbsensi.queryKey(),
        });
      },
      onError: (err) => {
        appToast.error(err.message);
      },
      onSettled: () => setLoading(false),
    }),
  );

  const onSubmit = (values: AbsensiFormValues) => {
    addAbsensi.mutate(values);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Catat Absensi</CardTitle>
        <CardDescription>
          Masukkan data kehadiran ke Google Sheet
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Hadir">Hadir</SelectItem>
                      <SelectItem value="Izin">Izin</SelectItem>
                      <SelectItem value="Sakit">Sakit</SelectItem>
                      <SelectItem value="Alpha">Alpha</SelectItem>
                      <SelectItem value="Cuti">Cuti</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jamMasuk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Masuk</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jamKeluar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Keluar</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan (Opsional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tambahkan keterangan"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Spinner /> : "Simpan Absensi"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
