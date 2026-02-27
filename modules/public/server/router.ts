import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { getSheetData, appendRow } from "@/lib/google-sheets";
import { absensiSchema, keuanganSchema } from "@/lib/form-schema";

export const sheetRouter = createTRPCRouter({
  // ==================== ABSENSI ====================
  getAbsensi: protectedProcedure.query(async () => {
    const rows = await getSheetData("Absensi!A:F");
    // Skip header row (index 0)
    const [header, ...data] = rows;
    return {
      header: header ?? [],
      data: data.map((row) => ({
        tanggal: row[0] ?? "",
        nama: row[1] ?? "",
        status: row[2] ?? "",
        jamMasuk: row[3] ?? "",
        jamKeluar: row[4] ?? "",
        keterangan: row[5] ?? "",
      })),
    };
  }),

  addAbsensi: protectedProcedure
    .input(absensiSchema)
    .mutation(async ({ input }) => {
      const result = await appendRow("Absensi", [
        input.tanggal,
        input.nama,
        input.status,
        input.jamMasuk,
        input.jamKeluar,
        input.keterangan,
      ]);
      return { success: true, updatedRows: result?.updatedRows };
    }),

  // ==================== KEUANGAN ====================
  getKeuangan: protectedProcedure.query(async () => {
    const rows = await getSheetData("Keuangan!A:F");
    const [header, ...data] = rows;
    return {
      header: header ?? [],
      data: data.map((row) => ({
        tanggal: row[0] ?? "",
        tipe: row[1] ?? "", // "Pemasukan" | "Pengeluaran"
        kategori: row[2] ?? "",
        deskripsi: row[3] ?? "",
        jumlah: row[4] ?? "",
        keterangan: row[5] ?? "",
      })),
    };
  }),

  addPemasukan: protectedProcedure
    .input(keuanganSchema)
    .mutation(async ({ input }) => {
      const result = await appendRow("Keuangan", [
        input.tanggal,
        "Pemasukan",
        input.kategori,
        input.deskripsi,
        input.jumlah,
        input.keterangan,
      ]);
      return { success: true, updatedRows: result?.updatedRows };
    }),

  addPengeluaran: protectedProcedure
    .input(keuanganSchema)
    .mutation(async ({ input }) => {
      const result = await appendRow("Keuangan", [
        input.tanggal,
        "Pengeluaran",
        input.kategori,
        input.deskripsi,
        input.jumlah,
        input.keterangan,
      ]);
      return { success: true, updatedRows: result?.updatedRows };
    }),
});
