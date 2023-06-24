import React from "react";
import { useParams } from "react-router";
import { useData } from "../../context/DataContext";
import { Card } from "../../component/Card";

export const PostDetail = () => {
  const { postId } = useParams();
  const { state } = useData();
  const findItem = state.sortedData.find((post) => post.postId === postId);
  console.log(findItem);
  return (
    <div className="main-content">
      <Card item={findItem} noDetail />
    </div>
  );
};
