import { useState, useEffect } from "react";
import Header from "@/components/Header";
import IssueCard from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Map as MapIcon, Trash2 } from "lucide-react";

interface Issue {
  title: string;
  description: string;
  location: string;
  status: "pending" | "in-progress" | "resolved";
  category: string;
  date: string;
}

const mockIssues: Issue[] = [
  {
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues near the intersection",
    location: "Main St & 5th Ave",
    status: "in-progress",
    category: "roads",
    date: "2 days ago",
  },
  {
    title: "Broken Streetlight",
    description: "Street light not working, creating safety concerns",
    location: "Oak Avenue",
    status: "pending",
    category: "lighting",
    date: "1 day ago",
  },
  {
    title: "Water Leak",
    description: "Visible water leak from underground pipe",
    location: "2nd Avenue",
    status: "in-progress",
    category: "water",
    date: "3 days ago",
  },
  {
    title: "Damaged Park Bench",
    description: "Park bench broken and needs repair",
    location: "Central Park",
    status: "pending",
    category: "parks",
    date: "4 days ago",
  },
  {
    title: "Graffiti Removal Needed",
    description: "Graffiti on public property wall",
    location: "Library Building",
    status: "resolved",
    category: "sanitation",
    date: "1 week ago",
  },
];

const Track = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Load from localStorage once when component mounts
  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("reports") || "[]");
    // Merge savedReports and mockIssues, removing duplicates
    const combinedIssues = [...savedReports, ...mockIssues].filter(
      (issue, index, self) =>
        index === self.findIndex((i) => i.title === issue.title)
    );
    setIssues(combinedIssues);
    localStorage.setItem("reports", JSON.stringify(combinedIssues));
  }, []);

  // Delete a specific issue
  const handleDelete = (title: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      const updatedReports = issues.filter((issue) => issue.title !== title);
      setIssues(updatedReports);
      localStorage.setItem("reports", JSON.stringify(updatedReports));
    }
  };

  // Filtering + Search Logic
  const filteredIssues = issues.filter((issue) => {
    const matchesCategory =
      filterCategory === "all" ||
      issue.category.toLowerCase() === filterCategory.toLowerCase();

    const matchesStatus =
      filterStatus === "all" || issue.status === filterStatus;

    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
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
                placeholder="Search issues by location, title, or description..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={() =>
                setViewMode(viewMode === "list" ? "map" : "list")
              }
              className="w-full md:w-auto"
            >
              <MapIcon className="h-4 w-4 mr-2" />
              {viewMode === "list" ? "Map View" : "List View"}
            </Button>
          </div>

          {/* Results */}
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredIssues.length} of {issues.length} issues
            </p>

           {viewMode === "list" ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredIssues.map((issue, index) => (
      <div key={index} className="relative">
        <IssueCard {...issue} />
        <button
          onClick={() => handleDelete(issue.title)}
          className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-700"
          title="Delete Issue"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
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
