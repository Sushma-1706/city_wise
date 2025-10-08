import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CityWise</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/report" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/report") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Report Issue
          </Link>
          <Link 
            to="/track" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/track") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Track Issues
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline">
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
