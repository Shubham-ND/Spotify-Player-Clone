import { createContext, useContext } from "react";

export const PlaylistContext = createContext();

export const usePlaylistContext = () => {
  return useContext(PlaylistContext);
};
