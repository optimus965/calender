import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Activity = {
  id: string;
  date: string;
  company: string;
  method: string;
  user: string;
};

const activities: Activity[] = [
  {
    id: "1",
    date: "2024-04-08 14:30",
    company: "Tech Corp",
    method: "LinkedIn Post",
    user: "John Doe",
  },
  {
    id: "2",
    date: "2024-04-08 11:15",
    company: "Innovation Labs",
    method: "Email",
    user: "Jane Smith",
  },
];

export function ActivityLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.company}</TableCell>
                <TableCell>{activity.method}</TableCell>
                <TableCell>{activity.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}