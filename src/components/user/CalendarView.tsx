import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for calendar events
const events = [
  {
    date: new Date(2024, 3, 15),
    companies: [
      { name: "Tech Corp", type: "LinkedIn Message" },
      { name: "Innovation Labs", type: "Email" },
    ],
  },
  {
    date: new Date(2024, 3, 20),
    companies: [
      { name: "Tech Corp", type: "Phone Call" },
    ],
  },
];

export function CalendarView() {
  const today = new Date();
  
  // Function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.find(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="grid md:grid-cols-[1fr,300px] gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Communication Calendar</CardTitle>
          <CardDescription>
            View and manage scheduled communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={today}
            className="rounded-md border"
            components={{
              DayContent: ({ date }) => {
                const events = getEventsForDate(date);
                return (
                  <div className="relative w-full h-full">
                    <div>{date.getDate()}</div>
                    {events && (
                      <div className="absolute bottom-0 left-0 right-0">
                        <div className="h-1 w-full bg-primary rounded-full" />
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Communications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="space-y-2">
                <p className="font-medium">
                  {event.date.toLocaleDateString()}
                </p>
                {event.companies.map((company, companyIndex) => (
                  <div
                    key={companyIndex}
                    className="flex items-center justify-between py-1"
                  >
                    <span>{company.name}</span>
                    <Badge variant="outline">{company.type}</Badge>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}