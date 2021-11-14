import { FC } from "react";
import { useRecoilValueLoadable } from "recoil";

import { MoviesState } from "src/states/movies";
import { MoviesList } from "components/MoviesList";

export const MoviesListContainer: FC = () => {
  const moviesState = useRecoilValueLoadable(MoviesState);

  if (moviesState.state === "loading") return <>Loading...</>;
  if (moviesState.state === "hasValue")
    return <MoviesList movies={moviesState.contents} />;

  return <></>;
};
