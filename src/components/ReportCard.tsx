import VoteButtons from "./VoteButtons";
import CommentSection from "./CommentSection";
import { Report } from "../types/report";

interface Props {
  report: Report;
  user: { uid: string; displayName?: string };
}

export default function ReportCard({ report, user }: Props) {
  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="font-bold">{report.title}</h2>
      <p>{report.description}</p>
      <VoteButtons
        reportId={report.id}
        upvotes={report.upvotes}
        downvotes={report.downvotes}
        userId={user.uid}
      />
      <CommentSection
        reportId={report.id}
        comments={report.comments || []}
        userId={user.uid}
        username={user.displayName || "Anonymous"}
      />
    </div>
  );
}
