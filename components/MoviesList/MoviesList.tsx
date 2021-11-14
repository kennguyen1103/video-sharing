import { FC } from "react";

import { VStack, Box, Flex, Container } from "@chakra-ui/layout";
import Iframe from "react-iframe";

import firebase from "src/firebase";

import { MovieDetailContainer } from "components/MovieDetail";

interface MoviesListProps {
  movies: Array<firebase.firestore.DocumentData>;
}

export const MoviesList: FC<MoviesListProps> = ({ movies }) => {
  const youtube_parser = (url: string) => {
    var regExp =
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    var match = url.match(regExp);
    return match && match[1].length == 11 ? match[1] : false;
  };

  return (
    <Container maxW="container.md" mt="20px">
      <VStack spacing="4">
        {movies.map((movie, idx) => (
          <Flex w="100%" key={idx}>
            <Box>
              <Iframe
                url={`https://www.youtube.com/embed/${youtube_parser(
                  movie.url
                )}`}
                width="350px"
                height="200px"
                display="block"
              />
            </Box>
            <Box flex="1">
              <MovieDetailContainer videoId={youtube_parser(movie.url)} />
            </Box>
          </Flex>
        ))}
      </VStack>
    </Container>
  );
};
