import React from "react";
import { useData } from "../../context/DataContext";
import { Card } from "../../component/Card";

export const Home = () => {
  const { state } = useData();

  return (
    <div className="wholePost">
      <ul className="main-content">
        {state?.sortedData?.map((item) => (
          <li key={item.postId} className="list-post">
            <Card item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
