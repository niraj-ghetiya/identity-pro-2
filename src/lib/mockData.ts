import { KYCRecord } from "@/types/kyc";

export const mockKYCData: KYCRecord[] = [
  {
    id: "KYC001",
    userId: "USR001",
    userName: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    status: "approved",
    submittedAt: "2024-01-15T10:30:00Z",
    reviewedAt: "2024-01-16T14:20:00Z",
    completionPercentage: 100,
  },
  {
    id: "KYC002",
    userId: "USR002",
    userName: "Priya Sharma",
    email: "priya.sharma@example.com",
    status: "under_review",
    submittedAt: "2024-01-20T09:15:00Z",
    completionPercentage: 100,
  },
  {
    id: "KYC003",
    userId: "USR003",
    userName: "Amit Patel",
    email: "amit.patel@example.com",
    status: "pending",
    submittedAt: "2024-01-22T16:45:00Z",
    completionPercentage: 60,
  },
  {
    id: "KYC004",
    userId: "USR004",
    userName: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    status: "rejected",
    submittedAt: "2024-01-18T11:00:00Z",
    reviewedAt: "2024-01-19T10:30:00Z",
    completionPercentage: 100,
  },
  {
    id: "KYC005",
    userId: "USR005",
    userName: "Vikram Singh",
    email: "vikram.singh@example.com",
    status: "approved",
    submittedAt: "2024-01-10T08:20:00Z",
    reviewedAt: "2024-01-11T15:45:00Z",
    completionPercentage: 100,
  },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "text-success bg-success/10";
    case "rejected":
      return "text-destructive bg-destructive/10";
    case "under_review":
      return "text-warning bg-warning/10";
    case "pending":
      return "text-muted-foreground bg-muted";
    default:
      return "text-muted-foreground bg-muted";
  }
};
