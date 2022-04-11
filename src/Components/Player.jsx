import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { getSpotify, playSelectedSong, spotifyApi } from "../Services/spotify";
import { PlaylistContext } from "../Services/Context/PlaylistContext";
import { useDataLayerValue } from "../Services/DataLayer";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import "./Styling/Player.css";

const Player = () => {
  const spotify = getSpotify(localStorage.getItem("token"));
  const path = useLocation();
  const [playlists, setPlaylists] = useState("");
  const [{ currently_playing, songs }, dispatch] = useDataLayerValue();

  console.log("player rendered");

  const handlePlay = async (action) => {
    console.log(action);
    const res = await spotifyApi({ type: action });
    console.log(res);
    if (!res)
      dispatch({
        type: "SET_PLAYING_STATE",
        isPlaying: !currently_playing.isPlaying,
      });
  };

  const handleNext = async (skipDirection) => {
    if (songs.length === 0) {
      spotifyApi({ type: skipDirection });
      return;
    }
    let nextIndex = 0;
    const { current_track_index: index } = currently_playing;
    if (skipDirection === "SKIP_TO_NEXT") {
      nextIndex = index + 1 >= songs.length ? 0 : index + 1;
    } else {
      nextIndex = index - 1 < 0 ? songs.length - 1 : index - 1;
    }
    console.log(songs[nextIndex], index);
    const context_uri = songs[nextIndex].track.album.uri;
    const offset = songs[nextIndex].track.track_number;
    const res = await playSelectedSong(context_uri, offset, songs[nextIndex]);

    if (res) return;

    const playback_state = {
      isPlaying: true,
      current_track_index: nextIndex,
      songName: songs[nextIndex].track.name,
      coverPic: songs[nextIndex].track.album.images[2].url,
      progress: songs[nextIndex]?.progress_ms || 0,
      artists: songs[nextIndex].track.artists.reduce(
        (allArtists, rec, index) => {
          allArtists.push(rec.name);
          return allArtists;
        },
        []
      ),
    };

    dispatch({
      type: "SET_CURRENT_PLAYING",
      currently_playing: playback_state,
    });
  };

  useEffect(() => {
    async function loadPlaylistAndPlayback() {
      const playlists = await spotifyApi({ type: "GET_USER_PLAYLIST" });
      const user = await spotifyApi({ type: "GET_CURRENT_USER" });
      setPlaylists(playlists);
      dispatch({ type: "SET_USER", user });
    }
    loadPlaylistAndPlayback();
    console.log("called useEffct");
  }, []);

  console.log(playlists);
  return (
    <>
      <ToastContainer />
      {playlists && (
        <PlaylistContext.Provider value={playlists}>
          <div className="app">
            <Sidebar />
            <div className="body_container">
              <Header pathname={path.pathname} />
              <div className="lower_bodyContainer">
                <Outlet />
              </div>
            </div>
            <Footer
              className="footer_height"
              currently_playing={currently_playing}
              handlePlay={handlePlay}
              handleNext={handleNext}
              handlePrev={handleNext}
            />
          </div>
        </PlaylistContext.Provider>
      )}
    </>
  );
};

export default Player;
