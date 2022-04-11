import React from "react";
import { Navigate } from "react-router";
import "../Styling/PublicBannerCard.css";

const PublicBannerCard = ({
  image,
  title,
  bannerCardClick,
  id,
  type,
  description,
}) => {
  return (
    <div className="public_card" onClick={() => bannerCardClick(type, id)}>
      <img src={image} alt="ALBUM" />
      <h4>{title}</h4>
      <h5>{description}</h5>
    </div>
  );
};

export default PublicBannerCard;
