import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { StepIndicator } from "@/components/StepIndicator";
import { FileUpload } from "@/components/FileUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KYCFormData } from "@/types/kyc";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { number: 1, title: "Basic Info" },
  { number: 2, title: "Addresses" },
  { number: 3, title: "Documents" },
  { number: 4, title: "Liveness" },
  { number: 5, title: "Review" },
];

const UserKYC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState<KYCFormData>({
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
    },
    permanentAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    corporateAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    permanentDocType: { type: "aadhar" },
    corporateDocType: { type: "aadhar" },
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setShowConfirmDialog(false);
    toast({
      title: "KYC Submitted Successfully",
      description: "Your KYC application is now under review.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-2">KYC Verification</h1>
          <p className="text-muted-foreground text-lg">
            Complete your verification in 5 simple steps
          </p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <Card className="mt-8 shadow-2xl border-primary/10">
          <CardContent className="p-6 md:p-8">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.userInfo.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          userInfo: {
                            ...formData.userInfo,
                            firstName: e.target.value,
                          },
                        })
                      }
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.userInfo.lastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          userInfo: {
                            ...formData.userInfo,
                            lastName: e.target.value,
                          },
                        })
                      }
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.userInfo.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          userInfo: {
                            ...formData.userInfo,
                            email: e.target.value,
                          },
                        })
                      }
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.userInfo.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          userInfo: {
                            ...formData.userInfo,
                            phone: e.target.value,
                          },
                        })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.userInfo.dateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          userInfo: {
                            ...formData.userInfo,
                            dateOfBirth: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <FileUpload
                  label="Upload Photo"
                  value={formData.userInfo.photo}
                  onChange={(file) =>
                    setFormData({
                      ...formData,
                      userInfo: { ...formData.userInfo, photo: file },
                    })
                  }
                />
              </div>
            )}

            {/* Step 2: Addresses */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Permanent Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Street Address</Label>
                      <Input
                        value={formData.permanentAddress.street}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              ...formData.permanentAddress,
                              street: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={formData.permanentAddress.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              ...formData.permanentAddress,
                              city: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        value={formData.permanentAddress.state}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              ...formData.permanentAddress,
                              state: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter state"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ZIP Code</Label>
                      <Input
                        value={formData.permanentAddress.zipCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              ...formData.permanentAddress,
                              zipCode: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter ZIP code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input
                        value={formData.permanentAddress.country}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              ...formData.permanentAddress,
                              country: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Corporate Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Street Address</Label>
                      <Input
                        value={formData.corporateAddress.street}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            corporateAddress: {
                              ...formData.corporateAddress,
                              street: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={formData.corporateAddress.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            corporateAddress: {
                              ...formData.corporateAddress,
                              city: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        value={formData.corporateAddress.state}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            corporateAddress: {
                              ...formData.corporateAddress,
                              state: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter state"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ZIP Code</Label>
                      <Input
                        value={formData.corporateAddress.zipCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            corporateAddress: {
                              ...formData.corporateAddress,
                              zipCode: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter ZIP code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input
                        value={formData.corporateAddress.country}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            corporateAddress: {
                              ...formData.corporateAddress,
                              country: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Permanent Address Proof
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Document Type</Label>
                      <Select
                        value={formData.permanentDocType.type}
                        onValueChange={(value: any) =>
                          setFormData({
                            ...formData,
                            permanentDocType: {
                              ...formData.permanentDocType,
                              type: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aadhar">Aadhar Card</SelectItem>
                          <SelectItem value="dl">Driving License</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="voter_id">Voter ID</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FileUpload
                      label="Upload Document"
                      value={formData.permanentDocType.file}
                      onChange={(file) =>
                        setFormData({
                          ...formData,
                          permanentDocType: {
                            ...formData.permanentDocType,
                            file,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Corporate Address Proof
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Document Type</Label>
                      <Select
                        value={formData.corporateDocType.type}
                        onValueChange={(value: any) =>
                          setFormData({
                            ...formData,
                            corporateDocType: {
                              ...formData.corporateDocType,
                              type: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aadhar">Aadhar Card</SelectItem>
                          <SelectItem value="dl">Driving License</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="voter_id">Voter ID</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FileUpload
                      label="Upload Document"
                      value={formData.corporateDocType.file}
                      onChange={(file) =>
                        setFormData({
                          ...formData,
                          corporateDocType: {
                            ...formData.corporateDocType,
                            file,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Liveness */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                    <Camera className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Liveness Check</h2>
                  <p className="text-muted-foreground">
                    Take a selfie to verify your identity. Make sure your face is clearly visible.
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  <FileUpload
                    label="Capture Selfie"
                    capture={true}
                    value={formData.livenessPhoto}
                    onChange={(file) =>
                      setFormData({ ...formData, livenessPhoto: file })
                    }
                  />
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium">Tips for a perfect selfie:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Ensure good lighting</li>
                    <li>Face the camera directly</li>
                    <li>Remove glasses if possible</li>
                    <li>Neutral expression works best</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Review Your Information</h2>
                  <p className="text-muted-foreground">
                    Please review all the information before submitting
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      Personal Information
                    </h3>
                    <div className="space-y-2 ml-10">
                      <p className="text-sm">
                        <span className="font-medium">Name:</span> {formData.userInfo.firstName} {formData.userInfo.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Email:</span> {formData.userInfo.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Phone:</span> {formData.userInfo.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">DOB:</span> {formData.userInfo.dateOfBirth}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-success/5 to-success/10 border border-success/20 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-success">2</span>
                      </div>
                      Permanent Address
                    </h3>
                    <div className="space-y-1 ml-10">
                      <p className="text-sm">{formData.permanentAddress.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.permanentAddress.city}, {formData.permanentAddress.state} {formData.permanentAddress.zipCode}
                      </p>
                      <p className="text-sm text-muted-foreground">{formData.permanentAddress.country}</p>
                    </div>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-accent">3</span>
                      </div>
                      Corporate Address
                    </h3>
                    <div className="space-y-1 ml-10">
                      <p className="text-sm">{formData.corporateAddress.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.corporateAddress.city}, {formData.corporateAddress.state} {formData.corporateAddress.zipCode}
                      </p>
                      <p className="text-sm text-muted-foreground">{formData.corporateAddress.country}</p>
                    </div>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-warning">4</span>
                      </div>
                      Documents
                    </h3>
                    <div className="space-y-2 ml-10">
                      <p className="text-sm">
                        <span className="font-medium">Permanent Address Proof:</span>{" "}
                        <span className="capitalize">{formData.permanentDocType.type.replace("_", " ")}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Corporate Address Proof:</span>{" "}
                        <span className="capitalize">{formData.corporateDocType.type.replace("_", " ")}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 border border-muted rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you confirm that all information provided is accurate and complete.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                size="lg"
              >
                Previous
              </Button>
              {currentStep < 5 ? (
                <Button onClick={handleNext} size="lg">Next</Button>
              ) : (
                <Button onClick={() => setShowConfirmDialog(true)} size="lg" className="min-w-32">
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your KYC application? Please
              review all the information carefully before submitting.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Confirm & Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserKYC;
