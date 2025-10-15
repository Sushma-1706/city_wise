import { useState } from "react";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Comment } from "../types/report";

interface Props {
  reportId: string;
  comments: Comment[];
  userId: string;
  username: string;
}

export default function CommentSection({ reportId, comments, userId, username }: Props) {
  const [newComment, setNewComment] = useState("");

  const addComment = async () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
        userId,
        username,
        text: newComment,
        timestamp: Timestamp.now(),
        id: "",
        date: ""
    };
    const reportRef = doc(db, "reports", reportId);
    await updateDoc(reportRef, { comments: arrayUnion(comment) });
    setNewComment("");
  };

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-2">
        {comments.map((c, idx) => (
          <div key={idx} className="border p-2 rounded">
            <strong>{c.username}:</strong> {c.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-1 rounded flex-1"
        />
        <button onClick={addComment} className="bg-blue-500 text-white px-3 rounded">
          Comment
        </button>
      </div>
    </div>
  );
}
