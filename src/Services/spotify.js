import { toast } from "react-toastify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const authEndpoint = "https://accounts.spotify.com/authorize";
// const redirectUri = "https://spotify-player-88dbd.web.app/login";
const redirectUri = "http://localhost:3000/login";
const clientId = process.env.REACT_APP_CLIENT_ID;

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
  const reg = new RegExp("access_token=(.*?)&");
  const array = reg.exec(window.location.hash);
  return array ? array[1] : null;
};

export const getSpotify = (token) => {
  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(token);
  return spotify;
};

const spotify = new SpotifyWebApi();
spotify.setAccessToken(localStorage.getItem("token"));

export const spotifyApi = async ({ type, payload }) => {
  try {
    switch (type) {
      case "GET_USER_PLAYLIST":
        return await spotify.getUserPlaylists();

      case "GET_CURRENT_PLAYBACK_STATE":
        return await spotify.getMyCurrentPlaybackState();

      case "GET_PLAYLIST_SONGS":
        return await spotify.getPlaylistTracks(payload.id);

      case "PLAY_SELECTED_SONG":
        return await spotify.play({
          context_uri: payload.context_uri,
          offset: { position: payload.offset - 1 },
        });

      case "START_PLAYING":
        return await spotify.play();

      case "STOP_PLAYING":
        return await spotify.pause();

      case "SKIP_TO_NEXT":
        return await spotify.skipToNext();

      case "SKIP_TO_PREVIOUS":
        return await spotify.skipToPrevious();

      case "GET_CURRENT_USER":
        return await spotify.getMe();

      case "GET_ALBUM_SONGS":
        return spotify.getAlbumTracks(payload.id);
    }
  } catch (ex) {
    if (ex.status === 401) {
      localStorage.removeItem("token");
      window.location = "/";
      return;
    }
    toast("Please make sure spotify is up and running");
    return ex;
  }
};

export const playSelectedSong = async (context_uri, offset, curr_song) => {
  return await spotifyApi({
    type: "PLAY_SELECTED_SONG",
    payload: {
      context_uri,
      offset,
    },
  });
};
