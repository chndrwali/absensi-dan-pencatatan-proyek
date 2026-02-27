"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { keuanganSchema, type KeuanganFormValues } from "@/lib/form-schema";
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

type KeuanganFormProps = {
  variant: "pemasukan" | "pengeluaran";
};

const variantConfig = {
  pemasukan: {
    title: "Catat Pemasukan",
    description: "Tambahkan data pemasukan ke Google Sheet",
    submitLabel: "Simpan Pemasukan",
    successMessage: "Pemasukan berhasil dicatat!",
  },
  pengeluaran: {
    title: "Catat Pengeluaran",
    description: "Tambahkan data pengeluaran ke Google Sheet",
    submitLabel: "Simpan Pengeluaran",
    successMessage: "Pengeluaran berhasil dicatat!",
  },
} as const;

export const KeuanganForm = ({ variant }: KeuanganFormProps) => {
  const config = variantConfig[variant];
  const [loading, setLoading] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<KeuanganFormValues>({
    resolver: zodResolver(keuanganSchema),
    defaultValues: {
      tanggal: new Date().toISOString().split("T")[0],
      kategori: "",
      deskripsi: "",
      jumlah: "",
      keterangan: "",
    },
  });

  const mutationKey =
    variant === "pemasukan"
      ? trpc.sheet.addPemasukan
      : trpc.sheet.addPengeluaran;

  const addKeuangan = useMutation(
    mutationKey.mutationOptions({
      onMutate: () => setLoading(true),
      onSuccess: () => {
        appToast.success(config.successMessage);
        form.reset();
        queryClient.invalidateQueries({
          queryKey: trpc.sheet.getKeuangan.queryKey(),
        });
      },
      onError: (err) => {
        appToast.error(err.message);
      },
      onSettled: () => setLoading(false),
    }),
  );

  const onSubmit = (values: KeuanganFormValues) => {
    addKeuangan.mutate(values);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
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
              name="kategori"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {variant === "pemasukan" ? (
                        <>
                          <SelectItem value="Gaji">Gaji</SelectItem>
                          <SelectItem value="Bonus">Bonus</SelectItem>
                          <SelectItem value="Proyek">Proyek</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="Material">Material</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Makan">Makan</SelectItem>
                          <SelectItem value="Alat">Alat</SelectItem>
                          <SelectItem value="Operasional">
                            Operasional
                          </SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Deskripsi singkat"
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
              name="jumlah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah (Rp)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
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
              {loading ? <Spinner /> : config.submitLabel}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
