import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsSearch, BsBookmark } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";

const getActiveStyle = ({ isActive }) => ({
  fontWeight: isActive ? "600" : "400",
  color: "#181818",
});

export const LeftSidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" className="app-title flex" style={getActiveStyle}>
        <AiOutlineHome /> Home
      </NavLink>
      <NavLink className="app-title links flex">
        <BsSearch />
        Explore
      </NavLink>
      <NavLink className="app-title links flex">
        <BsBookmark />
        Bookmarks
      </NavLink>
      <NavLink className="app-title links flex">
        <VscAccount />
        Profile
      </NavLink>
    </div>
  );
};
