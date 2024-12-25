import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommunicationModal } from "./CommunicationModal";
import { type Company } from "../admin/CompanyManagement";

type Communication = {
  id: string;
  type: string;
  date: string;
  notes?: string;
};

type CompanyWithCommunications = Company & {
  communications: Communication[];
  nextCommunication: {
    type: string;
    dueDate: string;
  };
  status: "overdue" | "due" | "normal";
};

// Mock data for demonstration
const mockCompanies: CompanyWithCommunications[] = [
  {
    id: "1",
    name: "Tech Corp",
    location: "San Francisco, CA",
    linkedinProfile: "https://linkedin.com/company/techcorp",
    emails: ["contact@techcorp.com"],
    phoneNumbers: ["+1 (555) 123-4567"],
    comments: "Leading technology solutions provider",
    communicationPeriodicity: 14,
    communications: [
      {
        id: "c1",
        type: "LinkedIn Post",
        date: "2024-04-01",
        notes: "Shared their latest product launch",
      },
      {
        id: "c2",
        type: "Email",
        date: "2024-03-28",
        notes: "Discussed partnership opportunities",
      },
    ],
    nextCommunication: {
      type: "LinkedIn Message",
      dueDate: "2024-04-15",
    },
    status: "normal",
  },
  {
    id: "2",
    name: "Innovation Labs",
    location: "New York, NY",
    linkedinProfile: "https://linkedin.com/company/innovationlabs",
    emails: ["info@innovationlabs.com"],
    phoneNumbers: ["+1 (555) 987-6543"],
    comments: "Research and development firm",
    communicationPeriodicity: 7,
    communications: [
      {
        id: "c3",
        type: "Phone Call",
        date: "2024-04-05",
        notes: "Quarterly review call",
      },
    ],
    nextCommunication: {
      type: "Email",
      dueDate: "2024-04-08",
    },
    status: "due",
  },
];

export function UserDashboard() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: CompanyWithCommunications["status"]) => {
    switch (status) {
      case "overdue":
        return "bg-red-50 hover:bg-red-100";
      case "due":
        return "bg-yellow-50 hover:bg-yellow-100";
      default:
        return "hover:bg-muted/50";
    }
  };

  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button
            variant="default"
            disabled={selectedCompanies.length === 0}
            onClick={() => setIsModalOpen(true)}
          >
            Log Communication
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedCompanies([])}
            disabled={selectedCompanies.length === 0}
          >
            Clear Selection
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            Overdue: {mockCompanies.filter((c) => c.status === "overdue").length}
          </Badge>
          <Badge variant="secondary">
            <Calendar className="mr-1 h-3 w-3" />
            Due Today:{" "}
            {mockCompanies.filter((c) => c.status === "due").length}
          </Badge>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Recent Communications</TableHead>
              <TableHead>Next Scheduled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCompanies.map((company) => (
              <TableRow
                key={company.id}
                className={getStatusColor(company.status)}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(company.id)}
                    onChange={() => toggleCompanySelection(company.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </TableCell>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {company.communications.slice(0, 5).map((comm) => (
                      <TooltipProvider key={comm.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline">
                              {comm.type} ({new Date(comm.date).toLocaleDateString()})
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{comm.notes || "No notes available"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {company.nextCommunication.type} (
                    {new Date(company.nextCommunication.dueDate).toLocaleDateString()})
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CommunicationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedCompanies={selectedCompanies}
      />
    </div>
  );
}