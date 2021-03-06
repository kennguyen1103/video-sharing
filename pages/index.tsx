import type { NextPage } from "next";

import { useRecoilValue } from "recoil";

import { Container } from "@chakra-ui/react";

import { authState } from "src/states/auth";

import { NavBar } from "components/NavBar";

import { MoviesListContainer } from "components/MoviesList";

const Home: NextPage = () => {
  const auth = useRecoilValue(authState);

  return (
    <Container maxW="container.xl" py=" 10px">
      <NavBar></NavBar>

      <MoviesListContainer />
    </Container>
  );
};

export default Home;
