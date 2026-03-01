import Link from "next/link";
import { HardHat } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                <HardHat className="size-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Proyek<span className="text-cyan-500">Ku</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Solusi manajemen proyek konstruksi yang mudah, transparan, dan
              terintegrasi.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Navigasi</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Fitur
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cara Kerja
              </Link>
              <Link
                href="#tech-stack"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Tech Stack
              </Link>
            </nav>
          </div>

          {/* Auth */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Akun</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Daftar Gratis
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ProyekKu. Built with ❤️ using
            Next.js, tRPC & Prisma.
          </p>
        </div>
      </div>
    </footer>
  );
}
