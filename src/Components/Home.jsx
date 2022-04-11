import React, { useEffect, useState } from "react";
import { usePlaylistContext } from "../Services/Context/PlaylistContext";
import Banner from "./Banner";
import PublicPlaylistBannerCard from "./Common/PublicPlaylistBannerCard";
import { getSpotify } from "../Services/spotify";
import "./Styling/Home.css";

const Home = () => {
  const playlists = usePlaylistContext();
  const [featuredPlaylist, setFeaturePlaylist] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const userPlaylists = playlists?.items?.slice(0, 6);
  const spotify = getSpotify(localStorage.getItem("token"));

  useEffect(() => {
    spotify.getFeaturedPlaylists({ limit: 6 }).then((featuredPlaylist) => {
      setFeaturePlaylist(featuredPlaylist.playlists.items);
    });

    spotify.getMyRecentlyPlayedTracks({ limit: 6 }).then((recentlyPlayed) => {
      setRecentlyPlayed(recentlyPlayed.items);
    });
  }, []);

  return (
    <div className="home_elements">
      <Banner
        userPlaylists={
          userPlaylists.length > 0 ? userPlaylists : featuredPlaylist
        }
      />
      <PublicPlaylistBannerCard
        playlists={featuredPlaylist}
        heading="Featured Playlist"
        type="album"
      />

      <PublicPlaylistBannerCard
        playlists={recentlyPlayed}
        heading="Recently Played"
        type="songs"
      />
    </div>
  );
};

export default Home;
