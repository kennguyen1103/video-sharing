import { FC } from "react";
import { useRecoilValueLoadable } from "recoil";

import { Box, Heading, Text } from "@chakra-ui/react";

import { MovieDetailState } from "src/states/movies";

interface MovieDetailProps {
  videoId: string | false;
}

export const MovieDetail: FC<{ data: any }> = ({ data }) => {
  if (!data) return <></>;

  const { title, description, channelTitle } = data.items[0].snippet;

  return (
    <Box ml="10px">
      <Text color="red.400">{title}</Text>
      <Text>Share by: {channelTitle}</Text>
      <Text>Description:</Text>
      <Text whiteSpace="pre-line">{description}</Text>
    </Box>
  );
};

export const MovieDetailContainer: FC<MovieDetailProps> = ({ videoId }) => {
  const moviesDetailState = useRecoilValueLoadable(
    MovieDetailState(videoId || "")
  );

  if (moviesDetailState.state === "loading") return <>Loading...</>;
  if (moviesDetailState.state === "hasValue")
    return <MovieDetail data={moviesDetailState.contents} />;

  return <></>;
};
