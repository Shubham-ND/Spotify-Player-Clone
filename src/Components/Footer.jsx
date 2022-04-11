import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faShuffle,
  faPlayCircle,
  faBackwardStep,
  faLaptopHouse,
  faForwardStep,
  faMusic,
  faBars,
  faVolumeHigh,
  faRepeat,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDataLayerValue } from "../Services/DataLayer";
import "./Styling/Footer.css";

const Footer = ({ handlePlay, handleNext, handlePrev }) => {
  const [playback, setPlayback] = useState(0);
  const [{ currently_playing }, dispatch] = useDataLayerValue();

  const handleRange = (value) => {
    setPlayback(value);
  };

  return (
    <div className="footer_container">
      <div className="footer_left">
        <img src={currently_playing?.coverPic} alt="not found" />
        <div>
          <h4>{currently_playing?.songName}</h4>
          <h6>{currently_playing?.artists?.join(", ")}</h6>
        </div>
      </div>
      <div>
        <div className="footer_mid">
          <FontAwesomeIcon className="fa-xl" icon={faShuffle} />
          <FontAwesomeIcon
            className="fa-xl"
            icon={faBackwardStep}
            onClick={() => handleNext("SKIP_TO_PREVIOUS")}
          />
          {!currently_playing?.isPlaying && (
            <FontAwesomeIcon
              className="fa-2x"
              icon={faPlayCircle}
              onClick={() => handlePlay("START_PLAYING")}
            />
          )}
          {currently_playing?.isPlaying && (
            <FontAwesomeIcon
              className="fa-2x"
              icon={faPauseCircle}
              onClick={() => handlePlay("STOP_PLAYING")}
            />
          )}
          <FontAwesomeIcon
            className="fa-xl"
            icon={faForwardStep}
            onClick={() => handleNext("SKIP_TO_NEXT")}
          />
          <FontAwesomeIcon icon={faRepeat} />
        </div>
        <div className="playback_position">
          <h6>0.0</h6>
          <input
            type="range"
            className="slider"
            min="1"
            max="100"
            value={currently_playing?.progress / 60000 || 0}
            id="myrange"
            onChange={(e) => handleRange(e.target.value)}
          />

          <h6>{currently_playing?.item?.duration_ms / 60000 || "0.0"}</h6>
        </div>
      </div>
      <div className="footer_right">
        <FontAwesomeIcon className="right_footer_icons" icon={faMusic} />
        <FontAwesomeIcon className="right_footer_icons" icon={faBars} />
        <FontAwesomeIcon className="right_footer_icons" icon={faLaptopHouse} />
        <div className="volume">
          <FontAwesomeIcon className="right_footer_icons" icon={faVolumeHigh} />
          <input type="range" className="volume_slider" />
        </div>
        <FontAwesomeIcon className="right_footer_icons" icon={faAngleDown} />
      </div>
    </div>
  );
};

export default Footer;
