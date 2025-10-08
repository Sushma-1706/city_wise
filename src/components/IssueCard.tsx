import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

interface IssueCardProps {
  title: string;
  description: string;
  location: string;
  status: "pending" | "in-progress" | "resolved";
  category: string;
  date: string;
}

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const },
  "in-progress": { label: "In Progress", variant: "default" as const },
  resolved: { label: "Resolved", variant: "outline" as const },
};

const IssueCard = ({ title, description, location, status, category, date }: IssueCardProps) => {
  const statusInfo = statusConfig[status];
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm">
              <MapPin className="h-3 w-3" />
              {location}
            </CardDescription>
          </div>
          <Badge 
            variant={statusInfo.variant}
            className={
              status === "resolved" 
                ? "bg-success text-success-foreground hover:bg-success/90" 
                : status === "in-progress"
                ? "bg-warning text-warning-foreground hover:bg-warning/90"
                : ""
            }
          >
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Badge variant="outline">{category}</Badge>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
