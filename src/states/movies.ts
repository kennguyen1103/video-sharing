import axios from "axios";

import { selector, selectorFamily } from "recoil";

import firebase from "src/firebase";
import { routerChangeState } from "./common";

const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export const MoviesState = selector({
  key: "MOVIES_STATE",
  get: async ({ get }) => {
    get(routerChangeState);

    const moviesRef = await firebase.firestore().collection("videos").get();

    return moviesRef.docs.map((movie) => movie.data());
  },
});

export const MovieDetailState = selectorFamily({
  key: "MOVIE_DETAIL_STATE",
  get: (id: string) => async () => {
    if (id === "") return null;

    const videoData = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${googleApiKey}&id=${id}&part=snippet`
    );

    return videoData.data;
  },
});
