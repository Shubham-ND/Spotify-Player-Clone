import React, { useEffect, useState } from "react";
import { usePlaylistContext } from "../Services/Context/PlaylistContext";
import { useDataLayerValue } from "../Services/DataLayer";
import Banner from "./Banner";
import PublicPlaylistBannerCard from "./Common/PublicPlaylistBannerCard";
import "./Styling/Home.css";
import { getSpotify } from "../Services/spotify";

const Home = () => {
  const playlists = usePlaylistContext();
  const [featuredPlaylist, setFeaturePlaylist] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const userPlaylists = playlists?.items?.slice(0, 6);
  const spotify = getSpotify(localStorage.getItem("token"));

  useEffect(() => {
    spotify.getFeaturedPlaylists({ limit: 6 }).then((featuredPlaylist) => {
      setFeaturePlaylist(featuredPlaylist.playlists.items);
    });

    // spotify.getNewReleases({ limit: 6 }).then((newRelease) => {
    //   setNewRelease(newRelease.albums.items);
    // });

    spotify.getMyRecentlyPlayedTracks({ limit: 6 }).then((recentlyPlayed) => {
      setRecentlyPlayed(recentlyPlayed.items);
    });
  }, []);
  // console.log("featured", featured);

  console.log("new release", featuredPlaylist);

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
      {/* <PublicPlaylistBannerCard
        playlists={newRelease}
        heading="New Release"
        type="album"
      /> */}
      <PublicPlaylistBannerCard
        playlists={recentlyPlayed}
        heading="Recently Played"
        type="songs"
      />
      {/* <PublicPlaylistBannerCard playlists={recentlyPlayed} /> */}
      {/* <PublicPlaylistBannerCard /> */}
      {/* <PublicPlaylistBannerCard /> */}
      {/* <PublicPlaylistBannerCard /> */}
      {/* <PublicPlaylistBannerCard /> */}
      {/*on condition that playlists count is more 6*/}
      {/* {/* <Banner /> */}
      {/* <Banner /> */}
      {/* <Banner />
      <Banner />  */}
    </div>
  );
};

export default Home;
