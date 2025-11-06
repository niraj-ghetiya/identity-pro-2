import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, FileText, CheckCircle2, Shield, XCircle, RotateCcw, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { mockKYCData, getStatusColor } from "@/lib/mockData";

const KYCDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const record = mockKYCData.find((r) => r.id === id);
  const [selectedDoc, setSelectedDoc] = useState<"permanent" | "corporate" | null>(null);

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

  const handleApprove = () => {
    toast({
      title: "KYC Approved",
      description: `KYC for ${record.userName} has been approved.`,
    });
    navigate("/dashboard");
  };

  const handleReject = () => {
    toast({
      title: "KYC Rejected",
      description: `KYC for ${record.userName} has been rejected.`,
      variant: "destructive",
    });
    navigate("/dashboard");
  };

  const handleReKYC = () => {
    toast({
      title: "Re-KYC Requested",
      description: `Re-KYC request sent to ${record.userName}.`,
    });
    navigate("/dashboard");
  };

  // Mock extracted document data
  const getDocData = (type: "permanent" | "corporate") => {
    const docType = type === "permanent" ? "Aadhar Card" : "Driving License";
    return {
      docType,
      extractedData: {
        name: record.userName,
        address: type === "permanent" 
          ? `${mockUserData.permanentAddress.street}, ${mockUserData.permanentAddress.city}`
          : `${mockUserData.corporateAddress.street}, ${mockUserData.corporateAddress.city}`,
        docNumber: type === "permanent" ? "1234 5678 9012" : "DL-1234567890",
      },
      validations: {
        nameMatch: { status: "high", message: "Name matches user profile" },
        photoMatch: { status: "high", message: "Photo matches user selfie" },
      }
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex flex-col gap-4">
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

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              onClick={handleApprove}
              className="gap-2 bg-success hover:bg-success/90"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </Button>
            <Button
              onClick={handleReject}
              variant="destructive"
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={handleReKYC}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Re-KYC
            </Button>
          </div>
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
                <button
                  onClick={() => setSelectedDoc("permanent")}
                  className="w-full h-40 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20 hover:border-primary transition-all cursor-pointer group"
                >
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Click to verify</p>
                  </div>
                </button>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Corporate Address Proof</p>
                <p className="text-sm text-muted-foreground">
                  Document Type: Driving License
                </p>
                <button
                  onClick={() => setSelectedDoc("corporate")}
                  className="w-full h-40 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20 hover:border-primary transition-all cursor-pointer group"
                >
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Click to verify</p>
                  </div>
                </button>
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

      {/* Document Verification Modal */}
      <Dialog open={selectedDoc !== null} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Document Verification
            </DialogTitle>
          </DialogHeader>

          {selectedDoc && (
            <div className="space-y-6 mt-4">
              {/* Document Image */}
              <div className="space-y-2">
                <h3 className="font-semibold">Document Image</h3>
                <div className="w-full h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-muted-foreground/20">
                  <FileText className="w-16 h-16 text-muted-foreground" />
                </div>
              </div>

              {/* Extracted Data */}
              <div className="space-y-2">
                <h3 className="font-semibold">Extracted Data</h3>
                <Card className="bg-muted/50">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Document Type:</span>
                      <span className="text-sm font-medium">{getDocData(selectedDoc).docType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="text-sm font-medium">{getDocData(selectedDoc).extractedData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Address:</span>
                      <span className="text-sm font-medium text-right">{getDocData(selectedDoc).extractedData.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Document Number:</span>
                      <span className="text-sm font-medium">{getDocData(selectedDoc).extractedData.docNumber}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Validation Checks */}
              <div className="space-y-2">
                <h3 className="font-semibold">Validation Checks</h3>
                <div className="space-y-3">
                  {/* Name Match */}
                  <Card className="border-success/20 bg-success/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <p className="font-medium">Name Match</p>
                            <p className="text-sm text-muted-foreground">
                              {getDocData(selectedDoc).validations.nameMatch.message}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-success text-success-foreground">
                          {getDocData(selectedDoc).validations.nameMatch.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Photo Match */}
                  <Card className="border-success/20 bg-success/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <p className="font-medium">Photo Match</p>
                            <p className="text-sm text-muted-foreground">
                              {getDocData(selectedDoc).validations.photoMatch.message}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-success text-success-foreground">
                          {getDocData(selectedDoc).validations.photoMatch.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KYCDetail;
