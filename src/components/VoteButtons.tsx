import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";

interface Props {
  reportId: string;
  upvotes: string[];
  downvotes: string[];
  userId: string;
}

export default function VoteButtons({ reportId, upvotes, downvotes, userId }: Props) {
  const [userVote, setUserVote] = useState<string | null>(
    upvotes.includes(userId) ? "up" : downvotes.includes(userId) ? "down" : null
  );

  const handleVote = async (type: "up" | "down") => {
    const reportRef = doc(db, "reports", reportId);

    if (type === "up") {
      if (userVote === "up") {
        await updateDoc(reportRef, { upvotes: arrayRemove(userId) });
        setUserVote(null);
      } else {
        await updateDoc(reportRef, {
          upvotes: arrayUnion(userId),
          downvotes: arrayRemove(userId),
        });
        setUserVote("up");
      }
    } else {
      if (userVote === "down") {
        await updateDoc(reportRef, { downvotes: arrayRemove(userId) });
        setUserVote(null);
      } else {
        await updateDoc(reportRef, {
          downvotes: arrayUnion(userId),
          upvotes: arrayRemove(userId),
        });
        setUserVote("down");
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => handleVote("up")} className={userVote === "up" ? "text-green-500" : ""}>
        👍 {upvotes.length}
      </button>
      <button onClick={() => handleVote("down")} className={userVote === "down" ? "text-red-500" : ""}>
        👎 {downvotes.length}
      </button>
    </div>
  );
}
