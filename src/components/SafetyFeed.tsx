import { Clock, MapPin, HandHelping, Camera, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: number;
  title: string;
  description: string;
  location: string;
  time: string;
  image: string;
  volunteers: number;
  type: "incident" | "alert" | "resolved";
}

const reports: Report[] = [
  {
    id: 1,
    title: "Suspicious Activity Reported",
    description: "Person seen looking into parked cars near 5th and Market. Stay alert.",
    location: "5th & Market St",
    time: "10 min ago",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    volunteers: 3,
    type: "alert",
  },
  {
    id: 2,
    title: "Lost Child Found",
    description: "Young child found at Union Square. Waiting with security for parents.",
    location: "Union Square",
    time: "25 min ago",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
    volunteers: 8,
    type: "resolved",
  },
  {
    id: 3,
    title: "Street Light Outage",
    description: "Multiple street lights out on Oak Street. Reduced visibility at night.",
    location: "Oak Street",
    time: "1 hour ago",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=200&fit=crop",
    volunteers: 2,
    type: "incident",
  },
];

const SafetyFeed = () => {
  const { toast } = useToast();
  const [volunteered, setVolunteered] = useState<number[]>([]);

  const handleVolunteer = (reportId: number) => {
    if (volunteered.includes(reportId)) {
      toast({
        title: "Already volunteered",
        description: "You've already signed up to help with this report.",
      });
      return;
    }

    setVolunteered([...volunteered, reportId]);
    toast({
      title: "Thank you for volunteering!",
      description: "You'll receive updates about this report.",
      className: "bg-card border-alert-safe",
    });
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "alert":
        return <span className="px-2 py-0.5 rounded-full text-xs bg-alert-warning/20 text-alert-warning border border-alert-warning/30">Active Alert</span>;
      case "resolved":
        return <span className="px-2 py-0.5 rounded-full text-xs bg-alert-safe/20 text-alert-safe border border-alert-safe/30">Resolved</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs bg-secondary/20 text-secondary border border-secondary/30">Incident</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-secondary" />
          <h2 className="font-display font-semibold text-lg">Community Safety Feed</h2>
        </div>
        <span className="text-xs text-muted-foreground">{reports.length} active reports</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <div
            key={report.id}
            className="glass-elevated rounded-xl overflow-hidden group hover:border-secondary/30 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={report.image}
                alt={report.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute top-2 right-2">
                {getTypeBadge(report.type)}
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs text-foreground/80">
                <Camera className="h-3 w-3" />
                <span>Community Photo</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h3 className="font-medium text-sm leading-tight line-clamp-1">
                {report.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {report.description}
              </p>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{report.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{report.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HandHelping className="h-3 w-3 text-secondary" />
                  <span>{report.volunteers + (volunteered.includes(report.id) ? 1 : 0)} volunteers</span>
                </div>
                <Button
                  variant={volunteered.includes(report.id) ? "secondary" : "volunteer"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => handleVolunteer(report.id)}
                >
                  {volunteered.includes(report.id) ? "Joined" : "Volunteer"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyFeed;
