import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import "../Styling/Banner.css";
import { useNavigate } from "react-router";

const BannerCard = ({ url, title, showPlay, id }) => {
  const navigate = useNavigate();
  const redirectToPlaylist = () => {
    navigate(`playlists/${id}`);
  };

  return (
    <div className="flex_card" onClick={redirectToPlaylist}>
      <img src={url} alt="Not Found" />
      <h4>{title}</h4>
      {showPlay && (
        <FontAwesomeIcon icon={faCirclePlay} className="flex_cardPlayIcon" />
      )}
    </div>
  );
};

export default BannerCard;
