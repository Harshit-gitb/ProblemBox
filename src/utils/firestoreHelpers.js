// src/utils/firestoreHelpers.js
import { db } from "../Firebase";
import { setDoc, doc, addDoc, collection, updateDoc, increment, serverTimestamp } from "firebase/firestore";

// Save user
export const saveUserToFirestore = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName || "User",
      email: user.email,
      role: "user",
      badge: "Bronze",
    });
    console.log("✅ User saved to Firestore!");
  } catch (err) {
    console.error("❌ Error saving user:", err);
  }
};


// Submit an issue
export const submitIssue = async (issueData, userEmail) => {

  await addDoc(collection(db, "issues"), {
    title: issueData.title,
    description: issueData.description,
    tag: issueData.tag,
    priority: issueData.priority,
    status: "Open",
    createdBy: userEmail,
    image: issueData.image,
    location: issueData.location,
    createdAt: serverTimestamp(),
    upvotes: 0,
    downvotes: 0
  });
};

// Save user vote
export const voteOnIssue = async (issueId, userId, voteValue) => {
  await setDoc(doc(db, "votes", `${issueId}_${userId}`), {
    issueId,
    userId,
    vote: voteValue,
  });
};


// Update count in issue
export const updateIssueVote = async (issueId, isUpvote) => {
  const issueRef = doc(db, "issues", issueId);
  await updateDoc(issueRef, {
    upvotes: isUpvote ? increment(1) : increment(0),
    downvotes: !isUpvote ? increment(1) : increment(0),
  });
};

