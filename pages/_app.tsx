import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthWrapper } from "components/AuthWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <RecoilRoot>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
