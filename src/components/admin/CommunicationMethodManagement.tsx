import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

export type CommunicationMethod = {
  id: string;
  name: string;
  description: string;
  sequence: number;
  isMandatory: boolean;
};

const initialMethods: CommunicationMethod[] = [
  {
    id: "1",
    name: "LinkedIn Post",
    description: "Share content on company's LinkedIn page",
    sequence: 1,
    isMandatory: true,
  },
  {
    id: "2",
    name: "LinkedIn Message",
    description: "Direct message to company representatives",
    sequence: 2,
    isMandatory: true,
  },
  {
    id: "3",
    name: "Email",
    description: "Email communication",
    sequence: 3,
    isMandatory: true,
  },
  {
    id: "4",
    name: "Phone Call",
    description: "Direct phone communication",
    sequence: 4,
    isMandatory: false,
  },
  {
    id: "5",
    name: "Other",
    description: "Other forms of communication",
    sequence: 5,
    isMandatory: false,
  },
];

export function CommunicationMethodManagement() {
  const [methods, setMethods] = useState<CommunicationMethod[]>(initialMethods);

  const toggleMandatory = (id: string) => {
    setMethods(
      methods.map((method) =>
        method.id === id
          ? { ...method, isMandatory: !method.isMandatory }
          : method
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Communication Methods</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Method
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sequence</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Mandatory</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {methods
              .sort((a, b) => a.sequence - b.sequence)
              .map((method) => (
                <TableRow key={method.id}>
                  <TableCell>{method.sequence}</TableCell>
                  <TableCell className="font-medium">{method.name}</TableCell>
                  <TableCell>{method.description}</TableCell>
                  <TableCell>
                    <Switch
                      checked={method.isMandatory}
                      onCheckedChange={() => toggleMandatory(method.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}