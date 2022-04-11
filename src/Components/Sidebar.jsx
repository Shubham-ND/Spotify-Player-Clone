import React from "react";
import SidebarOptions from "./SidebarOptions";
import { faHouseCrack } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { usePlaylistContext } from "../Services/Context/PlaylistContext";
import "./Styling/Sidebar.css";

const Sidebar = () => {
  console.log("sidebar rendered");
  const playlists = usePlaylistContext();
  return (
    <div className="sidebar_container">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
        alt=""
        className="spotify_logo"
      />
      <SidebarOptions title="Home" icon={faHouseCrack} page="/" />
      <SidebarOptions title="Search" icon={faMagnifyingGlass} page="search" />
      <SidebarOptions title="Your Library" icon={faBook} page="library" />
      <br />
      <SidebarOptions
        title="Create Playlist"
        icon={faSquarePlus}
        page="playlists"
      />
      <SidebarOptions title="Liked Songs" icon={faHeart} page="songsList" />
      <hr />
      <div className="playlist_container">
        {playlists?.items?.map((playlist) => (
          <SidebarOptions
            key={playlist.id}
            title={playlist.name}
            page={`playlists/${playlist.id}`}
            // playlist
          />
        ))}
      </div>

      <SidebarOptions icon={faHeart} title="Install App" page="installApp" />
    </div>
  );
};

export default Sidebar;
