import React, { useEffect, useState } from "react";
import { getSpotify } from "../Services/spotify";
import GenreCard from "./Common/GenreCard";
import "./Styling/GenreList.css";

const GenreList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const spotify = getSpotify(localStorage.getItem("token"));
    spotify.getCategories().then((categories) => {
      setCategories(categories.categories.items);
    });
  }, []);

  return (
    <>
      {categories.length > 0 && (
        <>
          <h2 className="heading">Browse All</h2>
          <div className="genre_list">
            {categories.map((category) => (
              <GenreCard
                key={category.id}
                image={category?.icons[0]?.url}
                title={category?.name}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default GenreList;
