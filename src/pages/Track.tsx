import { useState } from "react";
import Header from "@/components/Header";
import IssueCard from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Map as MapIcon } from "lucide-react";

const Track = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const mockIssues = [
    {
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues near the intersection",
      location: "Main St & 5th Ave",
      status: "in-progress" as const,
      category: "Roads",
      date: "2 days ago",
    },
    {
      title: "Broken Streetlight",
      description: "Street light not working, creating safety concerns",
      location: "Oak Avenue",
      status: "pending" as const,
      category: "Lighting",
      date: "1 day ago",
    },
    {
      title: "Garbage Accumulation",
      description: "Overflowing garbage bins need immediate attention",
      location: "Park Street",
      status: "resolved" as const,
      category: "Sanitation",
      date: "5 days ago",
    },
    {
      title: "Water Leak",
      description: "Visible water leak from underground pipe",
      location: "2nd Avenue",
      status: "in-progress" as const,
      category: "Water",
      date: "3 days ago",
    },
    {
      title: "Damaged Park Bench",
      description: "Park bench broken and needs repair",
      location: "Central Park",
      status: "pending" as const,
      category: "Parks",
      date: "4 days ago",
    },
    {
      title: "Graffiti Removal Needed",
      description: "Graffiti on public property wall",
      location: "Library Building",
      status: "resolved" as const,
      category: "Sanitation",
      date: "1 week ago",
    },
  ];

  const filteredIssues = mockIssues.filter((issue) => {
    if (filterCategory !== "all" && issue.category.toLowerCase() !== filterCategory) {
      return false;
    }
    if (filterStatus !== "all" && issue.status !== filterStatus) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Track Issues</h1>
            <p className="text-muted-foreground">
              Monitor the status of reported issues in your community
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues by location or description..."
                className="pl-9"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="roads">Roads</SelectItem>
                <SelectItem value="lighting">Lighting</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="parks">Parks</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
              className="w-full md:w-auto"
            >
              <MapIcon className="h-4 w-4 mr-2" />
              {viewMode === "list" ? "Map View" : "List View"}
            </Button>
          </div>

          {/* Results */}
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredIssues.length} of {mockIssues.length} issues
            </p>

            {viewMode === "list" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIssues.map((issue, index) => (
                  <IssueCard key={index} {...issue} />
                ))}
              </div>
            ) : (
              <div className="bg-secondary/30 rounded-lg p-12 text-center">
                <MapIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Map View Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Interactive map with issue markers will be available once the backend is set up with location data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
