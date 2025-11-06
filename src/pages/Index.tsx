import { useNavigate } from "react-router-dom";
import { Shield, Users, FileCheck, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4">KYC Verification System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure and efficient Know Your Customer verification platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-primary/20" onClick={() => navigate("/admin")}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Admin Dashboard
                <LogIn className="w-4 h-4 text-muted-foreground" />
              </CardTitle>
              <CardDescription>
                Manage and review KYC applications with comprehensive analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">Access Dashboard</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-accent/20" onClick={() => navigate("/user/kyc")}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>User Verification</CardTitle>
              <CardDescription>
                Complete your KYC verification in 5 simple steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg" variant="outline">Start Verification</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
