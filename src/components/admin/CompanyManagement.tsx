import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyForm } from "./CompanyForm";
import { CompanyList } from "./CompanyList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export type Company = {
  id: string;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number;
};

const initialCompanies: Company[] = [
  {
    id: "1",
    name: "Tech Corp",
    location: "San Francisco, CA",
    linkedinProfile: "https://linkedin.com/company/techcorp",
    emails: ["contact@techcorp.com"],
    phoneNumbers: ["+1 (555) 123-4567"],
    comments: "Leading technology solutions provider",
    communicationPeriodicity: 14,
  },
];

export function CompanyManagement() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const { toast } = useToast();

  const handleAddCompany = (company: Omit<Company, "id">) => {
    const newCompany = {
      ...company,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCompanies([...companies, newCompany]);
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Company added successfully",
    });
  };

  const handleEditCompany = (company: Omit<Company, "id">) => {
    if (!editingCompany) return;
    
    const updatedCompany = {
      ...company,
      id: editingCompany.id,
    };
    
    setCompanies(companies.map((c) => 
      c.id === editingCompany.id ? updatedCompany : c
    ));
    
    setEditingCompany(null);
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Company updated successfully",
    });
  };

  const handleDeleteCompany = (id: string) => {
    setCompanies(companies.filter((company) => company.id !== id));
    toast({
      title: "Success",
      description: "Company deleted successfully",
    });
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingCompany(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Companies</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCompany(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingCompany ? "Edit Company" : "Add New Company"}
              </DialogTitle>
            </DialogHeader>
            <CompanyForm
              onSubmit={editingCompany ? handleEditCompany : handleAddCompany}
              initialData={editingCompany || undefined}
            />
          </DialogContent>
        </Dialog>
      </div>
      <CompanyList
        companies={companies}
        onDelete={handleDeleteCompany}
        onEdit={handleEdit}
      />
    </div>
  );
}