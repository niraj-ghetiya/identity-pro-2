import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, FileText, CheckCircle2, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { mockKYCData, getStatusColor } from "@/lib/mockData";

const KYCDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const record = mockKYCData.find((r) => r.id === id);

  if (!record) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">KYC Record Not Found</h1>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const mockUserData = {
    firstName: record.userName.split(" ")[0],
    lastName: record.userName.split(" ")[1] || "",
    email: record.email,
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    permanentAddress: {
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      country: "India",
    },
    corporateAddress: {
      street: "456 Tech Park",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560100",
      country: "India",
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">KYC Details</h1>
            <p className="text-muted-foreground">ID: {record.id}</p>
          </div>
          <Badge className={getStatusColor(record.status)} variant="secondary">
            {record.status.replace("_", " ")}
          </Badge>
        </div>

        {/* User Photo and Basic Info */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center md:justify-start">
                <div className="relative w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center shadow-xl ring-4 ring-primary/10">
                  <User className="w-24 h-24 text-primary" />
                  <div className="absolute -bottom-2 -right-2 bg-success rounded-full p-2 shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-success-foreground" />
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                    <p className="font-semibold text-lg">
                      {mockUserData.firstName} {mockUserData.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{mockUserData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">{mockUserData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Date of Birth</p>
                    <p className="font-medium">
                      {formatDate(mockUserData.dateOfBirth)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Addresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-success/20 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-success/5">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-success" />
                Permanent Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{mockUserData.permanentAddress.street}</p>
              <p>
                {mockUserData.permanentAddress.city},{" "}
                {mockUserData.permanentAddress.state}
              </p>
              <p>{mockUserData.permanentAddress.zipCode}</p>
              <p>{mockUserData.permanentAddress.country}</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-accent/5">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-accent" />
                Corporate Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{mockUserData.corporateAddress.street}</p>
              <p>
                {mockUserData.corporateAddress.city},{" "}
                {mockUserData.corporateAddress.state}
              </p>
              <p>{mockUserData.corporateAddress.zipCode}</p>
              <p>{mockUserData.corporateAddress.country}</p>
            </CardContent>
          </Card>
        </div>

        {/* Documents */}
        <Card className="border-warning/20 hover:shadow-lg transition-shadow">
          <CardHeader className="bg-warning/5">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-warning" />
              Verification Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-medium">Permanent Address Proof</p>
                <p className="text-sm text-muted-foreground">
                  Document Type: Aadhar Card
                </p>
                <div className="w-full h-40 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Corporate Address Proof</p>
                <p className="text-sm text-muted-foreground">
                  Document Type: Driving License
                </p>
                <div className="w-full h-40 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liveness Check */}
        <Card>
          <CardHeader>
            <CardTitle>Liveness Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-xs mx-auto h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <User className="w-32 h-32 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Submitted</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(record.submittedAt)}
                </p>
              </div>
            </div>
            {record.reviewedAt && (
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-success mt-2" />
                <div>
                  <p className="font-medium">Reviewed</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(record.reviewedAt)}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KYCDetail;
