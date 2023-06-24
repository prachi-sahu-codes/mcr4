import React from "react";
import { NavLink } from "react-router-dom";

const getActiveStyle = ({ isActive }) => ({
  fontWeight: isActive ? "700" : "600",
  color: "#181818",
});

export const LeftSidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" className="app-title" style={getActiveStyle}>
        Home
      </NavLink>
      <NavLink className="app-title links">Explore</NavLink>
      <NavLink className="app-title links">Bookmarks</NavLink>
      <NavLink className="app-title links">Profile</NavLink>
    </div>
  );
};
