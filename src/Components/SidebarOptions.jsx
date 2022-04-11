import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Styling/SidebarOptions.css";

const SidebarOptions = ({ title, icon = null, page = "#" }) => {
  const cls = icon ? "with_icon" : "without_icon";
  return (
    <NavLink
      to={page}
      className={({ isActive }) =>
        isActive ? "sidebar_options active" : "sidebar_options"
      }
    >
      {icon && <FontAwesomeIcon icon={icon} className="sidebar_icons" />}
      <p className={cls}>{title}</p>
    </NavLink>
  );
};

export default SidebarOptions;
