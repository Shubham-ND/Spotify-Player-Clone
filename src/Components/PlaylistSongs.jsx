import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { faEllipsis, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDataLayerValue } from "../Services/DataLayer";
import { usePlaylistContext } from "../Services/Context/PlaylistContext";
import { playSelectedSong, spotifyApi } from "../Services/spotify";
import SongRow from "./Common/SongRow";
import "./Styling/PlaylistSongs.css";

const PlaylistSongs = () => {
  const { state: showPlaylist } = useLocation();
  const { id } = useParams();
  const [{ songs }, dispatch] = useDataLayerValue();
  const playlist = usePlaylistContext();
  let curr_playlist = null;

  if (playlist) curr_playlist = playlist.items.filter((m) => m?.id === id);
  if (!curr_playlist.length) curr_playlist.push(showPlaylist);

  const playSong = async (context_uri, offset, curr_song, index) => {
    const res = await playSelectedSong(context_uri, offset, curr_song);
    if (res) return;

    const playback_state = {
      isPlaying: true,
      current_track_index: index,
      songName: curr_song.track.name,
      coverPic: curr_song.track.album.images[2].url,
      progress: curr_song?.progress_ms || 0,
      artists: curr_song.track.artists.reduce((allArtists, rec, index) => {
        allArtists.push(rec.name);
        return allArtists;
      }, []),
    };

    dispatch({
      type: "SET_CURRENT_PLAYING",
      currently_playing: playback_state,
    });
  };

  function formatDate(date_string) {
    const date_added = new Date(date_string);
    return `${date_added.getDate()}/${date_added.getMonth()}/${date_added.getFullYear()}`;
  }

  useEffect(() => {
    const loadPlaylist = async () => {
      const songs = await spotifyApi({
        type: "GET_PLAYLIST_SONGS",
        payload: { id },
      });
      dispatch({ type: "CURRENT_PLAYLIST_SONGS", songs: songs.items });
    };
    loadPlaylist();
  }, [id]);

  return (
    <>
      {songs && (
        <>
          <div className="songs_banner">
            <img src={curr_playlist[0]?.images[0]?.url} alt="" />
            <div className="songs_banner_title">
              {curr_playlist.length > 0 && <p>PLAYLIST</p>}
              <h1>{curr_playlist[0]?.name}</h1>
              <p>{curr_playlist[0]?.owner?.display_name}</p>
            </div>
          </div>

          <div className="songs_playbar">
            <FontAwesomeIcon icon={faCirclePlay} className="playbar_icon" />
            <FontAwesomeIcon icon={faEllipsis} />
          </div>

          <div>
            <div className="song_row row_header">
              <div className="index index_align">#</div>
              <div className="title">TITLE</div>
              <div className="album">ALBUM </div>
              <div className="date_added">DATE ADDED</div>
              <div className="duration">DURATION</div>
            </div>

            {songs.map((song, index) => (
              <SongRow
                key={index}
                index={index}
                imgUrl={song?.track?.album?.images[2]?.url}
                title={song?.track?.name}
                album={song?.track?.album?.name}
                date_added={formatDate(song?.added_at)}
                duration={(song?.track?.duration_ms / 60000).toFixed(2)}
                playSong={playSong}
                context_uri={song?.track?.album?.uri}
                offset={song?.track?.track_number}
                song={song}
                artists={song.track.artists.reduce((allArtists, rec, index) => {
                  allArtists.push(rec.name);
                  return allArtists;
                }, [])}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PlaylistSongs;
