import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for notifications
const notifications = {
  overdue: [
    {
      id: "1",
      company: "Tech Corp",
      type: "LinkedIn Message",
      dueDate: "2024-04-01",
    },
  ],
  dueToday: [
    {
      id: "2",
      company: "Innovation Labs",
      type: "Email",
      dueDate: "2024-04-08",
    },
  ],
};

export function NotificationPanel() {
  const totalNotifications =
    notifications.overdue.length + notifications.dueToday.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Bell className="h-4 w-4" />
          {totalNotifications > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {totalNotifications}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Overdue Communications</h4>
            <ScrollArea className="h-[100px]">
              {notifications.overdue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="font-medium">{item.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type} - Due: {item.dueDate}
                    </p>
                  </div>
                  <Badge variant="destructive">Overdue</Badge>
                </div>
              ))}
            </ScrollArea>
          </div>

          <div>
            <h4 className="font-medium mb-2">Due Today</h4>
            <ScrollArea className="h-[100px]">
              {notifications.dueToday.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="font-medium">{item.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type} - Due: {item.dueDate}
                    </p>
                  </div>
                  <Badge variant="secondary">Today</Badge>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}