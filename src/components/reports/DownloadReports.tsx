import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DownloadReports() {
  const handleDownloadPDF = () => {
    // Mock download functionality
    console.log("Downloading PDF report...");
  };

  const handleDownloadCSV = () => {
    // Mock download functionality
    console.log("Downloading CSV report...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Download Reports</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" onClick={handleDownloadCSV}>
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </CardContent>
    </Card>
  );
}