import { useCallback } from "react";

import firebase from "src/firebase";

export const useAuth = () => {
  const onLoginOrRegister = useCallback(
    async (email: string, password: string) => {
      try {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        const signinMethodsForEmail = await firebase
          .auth()
          .fetchSignInMethodsForEmail(email);

        if (signinMethodsForEmail && signinMethodsForEmail.length > 0) {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (exLogin) {}
        } else {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
        }
      } catch (ex: any) {
        throw new Error(ex.message);
      }
    },
    []
  );

  const onLogout = useCallback(async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.clear();
          window.location.href = "/";
        });
    } catch (error) {
      throw new Error("Can't sign out");
    }
  }, []);

  return { onLoginOrRegister, onLogout };
};
