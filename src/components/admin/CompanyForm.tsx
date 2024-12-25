import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Company } from "./CompanyManagement";

const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  linkedinProfile: z.string().url("Must be a valid URL"),
  emails: z.string().min(1, "At least one email is required"),
  phoneNumbers: z.string().min(1, "At least one phone number is required"),
  comments: z.string().optional(),
  communicationPeriodicity: z.coerce
    .number()
    .min(1, "Must be at least 1 day")
    .max(365, "Must be less than 365 days"),
});

type FormData = z.infer<typeof companySchema>;

type CompanyFormProps = {
  onSubmit: (data: Omit<Company, "id">) => void;
  initialData?: Company;
};

export function CompanyForm({ onSubmit, initialData }: CompanyFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(companySchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          location: initialData.location,
          linkedinProfile: initialData.linkedinProfile,
          emails: initialData.emails.join(", "),
          phoneNumbers: initialData.phoneNumbers.join(", "),
          comments: initialData.comments || "",
          communicationPeriodicity: initialData.communicationPeriodicity,
        }
      : {
          name: "",
          location: "",
          linkedinProfile: "",
          emails: "",
          phoneNumbers: "",
          comments: "",
          communicationPeriodicity: 14,
        },
  });

  const handleSubmit = (values: FormData) => {
    const submissionData = {
      name: values.name,
      location: values.location,
      linkedinProfile: values.linkedinProfile,
      emails: values.emails.split(",").map((email) => email.trim()),
      phoneNumbers: values.phoneNumbers
        .split(",")
        .map((phoneNumber) => phoneNumber.trim()),
      comments: values.comments || "",
      communicationPeriodicity: values.communicationPeriodicity,
    };

    onSubmit(submissionData);
  };

  // ... keep existing code (form rendering)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedinProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://linkedin.com/company/..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Addresses (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="email1@company.com, email2@company.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumbers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Numbers (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="+1 (555) 123-4567, +1 (555) 987-6543"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="communicationPeriodicity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Communication Periodicity (days)</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={365} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes about the company"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? "Update Company" : "Save Company"}
        </Button>
      </form>
    </Form>
  );
}
