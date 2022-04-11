import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const SongRow = ({
  index,
  imgUrl,
  title,
  album,
  date_added,
  duration,
  context_uri,
  offset,
  song,
  playSong,
  artists,
}) => {
  return (
    <div className="song_row">
      <div className="index">
        <h4>{index + 1}</h4>
        <FontAwesomeIcon
          icon={faPlay}
          onClick={() => playSong(context_uri, offset, song, index)}
          className="songplay_icon"
        />
      </div>
      <div className="title">
        <div className="song_card">
          <img src={imgUrl}></img>
          <div>
            <h4>{title}</h4>
            <Link to="" className="title_value">
              {artists}
            </Link>
          </div>
        </div>
      </div>
      <div className="album">
        <Link to="" className="album_link">
          {album}
        </Link>
      </div>
      <div className="date_added">
        <h5>{date_added}</h5>
      </div>
      <div className="duration">
        <h5>{duration}</h5>
      </div>
    </div>
  );
};

export default SongRow;
