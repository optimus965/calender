import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyManagement } from "@/components/admin/CompanyManagement";
import { CommunicationMethodManagement } from "@/components/admin/CommunicationMethodManagement";

export default function Admin() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
      </div>

      <Tabs defaultValue="companies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="companies">Company Management</TabsTrigger>
          <TabsTrigger value="communication">Communication Methods</TabsTrigger>
        </TabsList>
        <TabsContent value="companies" className="space-y-4">
          <CompanyManagement />
        </TabsContent>
        <TabsContent value="communication" className="space-y-4">
          <CommunicationMethodManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}