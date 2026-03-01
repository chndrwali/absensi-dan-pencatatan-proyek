import PageContainer from "@/components/custom/page-container";
import { AbsensiTable } from "@/modules/public/ui/section/dashboard/absensi-table";
import { AbsensiForm } from "@/modules/public/ui/form/absensi-form";

export default function AbsensiPage() {
  return (
    <PageContainer
      pageTitle="Absensi"
      pageDescription="Kelola data kehadiran pekerja"
      scrollable
    >
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AbsensiTable />
          </div>
          <div>
            <AbsensiForm />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
