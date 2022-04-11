import React from "react";
import "./Styling/Banner.css";

import BannerCard from "./Common/BannerCard";

const Banner = ({ userPlaylists }) => {
  return (
    <>
      <div className="banner_top">
        <div>
          <h1>Good Morning</h1>
        </div>

        <div className="banner_grid">
          {userPlaylists?.map((playlist) => (
            <BannerCard
              key={playlist.id}
              id={playlist.id}
              url={playlist?.images[0]?.url}
              title={playlist?.name}
              showPlay={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Banner;
