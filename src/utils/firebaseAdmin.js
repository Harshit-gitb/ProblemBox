import { getFunctions, httpsCallable } from "firebase/functions";

export function adminDeleteUser(uid) {
  const functions = getFunctions();
  const callable = httpsCallable(functions, "deleteUserAccount");
  return callable({ uid }); // returns a Promise
}
