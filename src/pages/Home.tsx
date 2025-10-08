import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import IssueCard from "@/components/IssueCard";
import heroImage from "@/assets/hero-city.jpg";

const Home = () => {
  const mockIssues = [
    {
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues",
      location: "Main St & 5th Ave",
      status: "in-progress" as const,
      category: "Roads",
      date: "2 days ago",
    },
    {
      title: "Broken Streetlight",
      description: "Street light not working, safety concern",
      location: "Oak Avenue",
      status: "pending" as const,
      category: "Lighting",
      date: "1 day ago",
    },
    {
      title: "Garbage Accumulation",
      description: "Overflowing garbage bins need attention",
      location: "Park Street",
      status: "resolved" as const,
      category: "Sanitation",
      date: "5 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: "brightness(0.4)"
          }}
        />
        <div className="relative container py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Make Your City Better, One Report at a Time
            </h1>
            <p className="text-xl text-white/90">
              CityWise connects citizens with local government to report, track, and resolve community issues efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/report">Report an Issue</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                <Link to="/track">Track Issues</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">892</div>
              <p className="text-xs text-muted-foreground">69% resolution rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Citizens</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,421</div>
              <p className="text-xs text-muted-foreground">Growing community</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5 days</div>
              <p className="text-xs text-muted-foreground">Getting faster</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="container py-16">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Recent Issues</h2>
            <p className="text-muted-foreground">See what's happening in your community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockIssues.map((issue, index) => (
              <IssueCard key={index} {...issue} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/track">View All Issues</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/30 py-16">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How CityWise Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A transparent platform connecting citizens and government for faster issue resolution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Report Issues</CardTitle>
                <CardDescription>
                  Take a photo, describe the problem, and pin it on the map. Your report is instantly submitted.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Follow your report's status from Pending to In Progress to Resolved with real-time updates.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Earn Rewards</CardTitle>
                <CardDescription>
                  Participate actively, vote on important issues, and earn points and badges for making a difference.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="bg-gradient-to-r from-primary to-primary/80 border-0">
          <CardHeader className="text-center space-y-4 py-12">
            <CardTitle className="text-3xl md:text-4xl text-primary-foreground">
              Ready to Make a Difference?
            </CardTitle>
            <CardDescription className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of citizens working together to create cleaner, safer, and better communities.
            </CardDescription>
            <div className="pt-4">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link to="/auth">Get Started Today</Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CityWise. Making cities better together.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
