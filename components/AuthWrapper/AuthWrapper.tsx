import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import firebase from "src/firebase";

import { authState } from "src/states/auth";
import { routerChangeState } from "src/states/common";

export const AuthWrapper: FC = ({ children }) => {
  const router = useRouter();
  const setAuth = useSetRecoilState(authState);
  const setRouterChange = useSetRecoilState(routerChangeState);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setAuth(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setRouterChange((oldValue) => oldValue + 1);
  }, [router.asPath]);

  return <>{children}</>;
};
