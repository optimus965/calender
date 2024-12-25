import { CommunicationChart } from "@/components/reports/CommunicationChart";
import { ActivityLog } from "@/components/reports/ActivityLog";
import { DownloadReports } from "@/components/reports/DownloadReports";

export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports & Analytics</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <CommunicationChart />
        <DownloadReports />
      </div>
      
      <ActivityLog />
    </div>
  );
}