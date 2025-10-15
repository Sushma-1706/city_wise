export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  date: string | number | Date; // keep only one
  timestamp?: any; // optional if needed
}


export interface Report {
  id?: string; // Firestore document ID
  title: string;
  description: string;
  location: string;
  category: string;
  status: "pending" | "in-progress" | "resolved";
  date: any; // Firestore Timestamp
  photo?: string;
  upvotes?: string[]; // array of userIds
  downvotes?: string[]; // array of userIds
  comments?: Comment[];
}
