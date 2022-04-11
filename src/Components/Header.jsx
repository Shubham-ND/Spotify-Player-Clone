import React from "react";
import { useNavigate } from "react-router";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDataLayerValue } from "../Services/DataLayer";
import "./Styling/Header.css";

const Header = ({ pathname }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useDataLayerValue();

  const logOutUser = () => {
    localStorage.removeItem("token");
    console.log("logged out");
    navigate("/login", {
      replace: true,
    });
  };

  console.log(pathname);
  const isVisibile = () => {
    return pathname === "/search" ? "search visible" : "search";
  };
  return (
    <div className="header_box">
      <div className="header_container">
        <div className="headet_left">
          <FontAwesomeIcon icon={faCircleChevronLeft} className="nav_iconB" />
          <FontAwesomeIcon icon={faCircleChevronRight} className="nav_iconF" />

          <div className={isVisibile()}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="nav_searchIcon"
            />
            <input type="text" placeholder="Search Artist, Genre, Songs" />
            <FontAwesomeIcon icon={faXmark} className="nav_searchIcon" />
          </div>
        </div>

        <div className="header_right">
          <div className="avatar_container">
            <Avatar
              name="Foo Bar"
              round={true}
              size="30"
              src={user?.images[0]?.url}
            />
            <h5>{user?.display_name}</h5>
            <FontAwesomeIcon icon={faSortDown} className="down_arrow" />
          </div>
          <span onClick={logOutUser}>
            <h5>Log Out</h5>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
