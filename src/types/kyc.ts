export type KYCStatus = "pending" | "approved" | "rejected" | "under_review";

export interface KYCRecord {
  id: string;
  userId: string;
  userName: string;
  email: string;
  status: KYCStatus;
  submittedAt: string;
  reviewedAt?: string;
  completionPercentage: number;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  photo?: File | string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DocumentType {
  type: "aadhar" | "dl" | "passport" | "voter_id";
  file?: File | string;
}

export interface KYCFormData {
  userInfo: UserInfo;
  permanentAddress: Address;
  corporateAddress: Address;
  permanentDocType: DocumentType;
  corporateDocType: DocumentType;
  livenessPhoto?: File | string;
}
