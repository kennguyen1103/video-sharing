import { atom } from "recoil";
import firebase from "firebase";

export const authState = atom<firebase.User | null>({
  key: "AUTH_STATE",
  default: null,
  dangerouslyAllowMutability: true,
});
