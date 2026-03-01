import PageContainer from "@/components/custom/page-container";
import { OverviewStats } from "@/modules/public/ui/section/dashboard/overview-stats";
import { BudgetPieChart } from "@/modules/public/ui/section/dashboard/budget-pie-chart";
import { RecentTransactions } from "@/modules/public/ui/section/dashboard/recent-transactions";
import { AttendanceSummary } from "@/modules/public/ui/section/dashboard/attendance-summary";

export default function OverviewPage() {
  return (
    <PageContainer
      pageTitle="Dashboard Overview"
      pageDescription="Ringkasan data proyek konstruksi Anda"
      scrollable
    >
      <div className="space-y-6">
        <OverviewStats />
        <div className="grid gap-6 lg:grid-cols-2">
          <BudgetPieChart />
          <AttendanceSummary />
        </div>
        <RecentTransactions />
      </div>
    </PageContainer>
  );
}
