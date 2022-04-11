import React from "react";
import { useNavigate } from "react-router";
import "../Styling/PublicPlaylistBannerCard.css";
import PublicBannerCard from "./PublicBannerCard";

const PublicPlaylistBannerCard = ({ playlists, heading, type }) => {
  const navigate = useNavigate();

  const handleOnBannerCardClick = (playlist, id) => {
    if (type === "album") {
      navigate(`/playlists/${id}`, { state: playlist });
      return;
    }
  };

  return (
    <>
      {playlists.length > 0 && (
        <>
          <div className="public_playlistBanner">
            <h1>{heading}</h1>
            <div className="public_playlistBannerFlex">
              {playlists.map((playlist) => (
                <PublicBannerCard
                  key={type === "album" ? playlist?.id : playlist?.track?.id}
                  id={type === "album" ? playlist?.id : playlist?.track?.id}
                  image={
                    type === "album"
                      ? playlist?.images[0].url
                      : playlist?.track?.album?.images[0].url
                  }
                  title={
                    type === "album" ? playlist?.name : playlist?.track?.name
                  }
                  track_number={
                    type === "album" ? null : playlist?.track?.track_number
                  }
                  type={type}
                  description={playlist.description}
                  bannerCardClick={() =>
                    handleOnBannerCardClick(playlist, playlist?.id)
                  }
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PublicPlaylistBannerCard;
