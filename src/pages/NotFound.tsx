import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Page Not Found" subtitle="The page you are looking for does not exist." />
      <div className="container mx-auto px-4 py-12">
        <div className="card-surface p-10 text-center">
          <p className="text-sm text-muted-foreground">Requested path: {location.pathname}</p>
          <Link to="/">
            <Button className="mt-6 rounded-xl">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
