import React from "react";

const GenreCard = ({ title, image }) => {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);
  let bgColor = `rgb(${x}, ${y}, ${z})`;
  return (
    <div className="genre_card" style={{ backgroundColor: bgColor }}>
      <h2>{title}</h2>
      <img src={image} alt="No Icon" />
    </div>
  );
};

export default GenreCard;
