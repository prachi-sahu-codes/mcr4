import React from "react";
import { useData } from "../context/DataContext";

export const SortBar = () => {
  const { state, dispatch } = useData();
  return (
    <div className="sort-bar">
      <select
        className="select"
        value={state.sortBy}
        onChange={(e) => dispatch({ type: "SORT", payload: e.target.value })}
      >
        <option value={""} disabled>
          Select Sort Options...
        </option>
        <option value={"latest"}>Latest</option>
        <option value={"upvote"}>Most upvote</option>
      </select>
    </div>
  );
};
