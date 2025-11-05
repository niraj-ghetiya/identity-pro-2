import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">KYC Verification</h1>
          <p className="text-muted-foreground">
            Complete your verification in 5 simple steps
          </p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <Card className="mt-8">
          <CardContent className="p-6">
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
                <h2 className="text-2xl font-semibold">Liveness Check</h2>
                <p className="text-muted-foreground">
                  Take a selfie to verify your identity. Make sure your face is
                  clearly visible.
                </p>
                <FileUpload
                  label="Capture Selfie"
                  capture={true}
                  value={formData.livenessPhoto}
                  onChange={(file) =>
                    setFormData({ ...formData, livenessPhoto: file })
                  }
                />
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Review Your Information</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <p className="text-sm">
                      {formData.userInfo.firstName} {formData.userInfo.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formData.userInfo.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formData.userInfo.phone}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Permanent Address</h3>
                    <p className="text-sm">{formData.permanentAddress.street}</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.permanentAddress.city},{" "}
                      {formData.permanentAddress.state}{" "}
                      {formData.permanentAddress.zipCode}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Corporate Address</h3>
                    <p className="text-sm">{formData.corporateAddress.street}</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.corporateAddress.city},{" "}
                      {formData.corporateAddress.state}{" "}
                      {formData.corporateAddress.zipCode}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Documents</h3>
                    <p className="text-sm">
                      Permanent Address: {formData.permanentDocType.type}
                    </p>
                    <p className="text-sm">
                      Corporate Address: {formData.corporateDocType.type}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              {currentStep < 5 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={() => setShowConfirmDialog(true)}>
                  Submit
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
