import React from "react";
import { useNavigate, useParams } from "react-router";
import { useData } from "../../context/DataContext";
import { Card } from "../../component/Card";
import { BiArrowBack } from "react-icons/bi";

export const PostDetail = () => {
  const { postId } = useParams();
  const { state } = useData();
  const navigate = useNavigate();

  const findItem = state.sortedData.find((post) => post.postId === postId);
  console.log(findItem);
  return (
    <div className="main-content">
      <div className="goback" onClick={() => navigate("/")}>
        {" "}
        <BiArrowBack />
      </div>
      <Card item={findItem} noDetail />
    </div>
  );
};
