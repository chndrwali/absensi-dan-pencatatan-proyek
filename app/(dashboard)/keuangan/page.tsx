import PageContainer from "@/components/custom/page-container";
import { KeuanganTable } from "@/modules/public/ui/section/dashboard/keuangan-table";
import { KeuanganForm } from "@/modules/public/ui/form/keuangan-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function KeuanganPage() {
  return (
    <PageContainer
      pageTitle="Keuangan"
      pageDescription="Kelola data pemasukan dan pengeluaran proyek"
      scrollable
    >
      <div className="space-y-6">
        <KeuanganTable />

        <Tabs defaultValue="pemasukan" className="w-full">
          <TabsList>
            <TabsTrigger value="pemasukan">Tambah Pemasukan</TabsTrigger>
            <TabsTrigger value="pengeluaran">Tambah Pengeluaran</TabsTrigger>
          </TabsList>
          <TabsContent value="pemasukan">
            <KeuanganForm variant="pemasukan" />
          </TabsContent>
          <TabsContent value="pengeluaran">
            <KeuanganForm variant="pengeluaran" />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
