import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { Company } from "./CompanyManagement";

type CompanyListProps = {
  companies: Company[];
  onDelete: (id: string) => void;
  onEdit: (company: Company) => void;
};

export function CompanyList({ companies, onDelete, onEdit }: CompanyListProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>LinkedIn</TableHead>
            <TableHead>Emails</TableHead>
            <TableHead>Phone Numbers</TableHead>
            <TableHead>Periodicity (days)</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell>
                <a
                  href={company.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Profile
                </a>
              </TableCell>
              <TableCell>{company.emails.join(", ")}</TableCell>
              <TableCell>{company.phoneNumbers.join(", ")}</TableCell>
              <TableCell>{company.communicationPeriodicity}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(company)}
                  >
                    <Pencil className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(company.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}