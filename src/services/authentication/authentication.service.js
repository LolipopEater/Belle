import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
