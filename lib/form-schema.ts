import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Type auth form
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ==================== SHEET SCHEMAS ====================

export const absensiSchema = z.object({
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  nama: z.string().min(1, "Nama wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
  jamMasuk: z.string().min(1, "Jam masuk wajib diisi"),
  jamKeluar: z.string().optional().default(""),
  keterangan: z.string().optional().default(""),
});

export const keuanganSchema = z.object({
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  kategori: z.string().min(1, "Kategori wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  jumlah: z.string().min(1, "Jumlah wajib diisi"),
  keterangan: z.string().optional().default(""),
});

// Type sheet form
export type AbsensiFormValues = z.infer<typeof absensiSchema>;
export type KeuanganFormValues = z.infer<typeof keuanganSchema>;
