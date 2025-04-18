export interface Bid {
  id: number;
  userId: number;
  projectId: number;
  status: "submitted" | "processing" | "failed";
  bidContent: string;
  createdAt: Date;
}